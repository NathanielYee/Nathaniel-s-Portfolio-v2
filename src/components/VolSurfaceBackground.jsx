import { useEffect, useRef } from "react";

const COLS = 28;
const ROWS = 18;
const LINE_COLOR_PRIMARY = "56, 189, 248"; // #38bdf8
const LINE_COLOR_SECONDARY = "96, 165, 250"; // #60a5fa
const NODE_COLOR = "147, 197, 253"; // #93c5fd

/**
 * Implied vol surface shape: smile across strike (x), term structure along tenor (z).
 * Returns a height (y) value for a normalized grid coordinate.
 */
function volSurfaceHeight(nx, nz, time) {
  // nx: 0..1 across strikes, nz: 0..1 across tenors
  // Center the strike axis around ATM
  const strike = (nx - 0.5) * 2; // -1 to 1
  const tenor = nz; // 0 (near) to 1 (far)

  // Smile: quadratic in strike, steeper for short tenors
  const smileWidth = 0.6 + tenor * 0.4; // smile flattens with tenor
  const smile = (strike * strike) / (smileWidth * smileWidth);

  // Skew: slightly higher on the left (put wing)
  const skew = -0.15 * strike * (1 - tenor * 0.5);

  // Term structure: base level rises with tenor
  const termStructure = tenor * 0.3;

  // Base vol level
  const baseVol = 0.25;

  // Animated wave: subtle breathing effect
  const wave =
    0.04 * Math.sin(time * 0.4 + nx * 4 + nz * 3) +
    0.025 * Math.sin(time * 0.7 - nx * 3 + nz * 5) +
    0.015 * Math.cos(time * 0.3 + nx * 2 - nz * 2);

  return baseVol + smile * 0.5 + skew + termStructure + wave;
}

/**
 * Project a 3D point (x, y, z) into 2D screen coords with perspective.
 * Camera looks down at the surface from above-front.
 */
function project(x, y, z, width, height) {
  // Camera / view parameters
  const fov = 600;
  const cameraY = -1.8;
  const cameraZ = -1.2;

  // Translate relative to camera
  const dx = x;
  const dy = y - cameraY;
  const dz = z - cameraZ;

  // Tilt angle (looking down at surface)
  const tilt = 0.55;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);

  const ry = dy * cosT - dz * sinT;
  const rz = dy * sinT + dz * cosT;

  // Perspective divide
  const scale = fov / (fov + rz);

  const sx = width * 0.5 + dx * scale * 200;
  const sy = height * 0.55 + ry * scale * 200;

  return { x: sx, y: sy, scale };
}

export const VolSurfaceBackground = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let running = true;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    // Pre-allocate grid arrays
    const grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ x: 0, y: 0, scale: 0 }))
    );

    function draw(timestamp) {
      if (!running) return;

      const time = timestamp * 0.001;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Detect dark mode via background color or class
      const isDark =
        document.documentElement.classList.contains("dark") ||
        getComputedStyle(document.documentElement)
          .getPropertyValue("color-scheme")
          .includes("dark");

      const baseOpacity = isDark ? 0.12 : 0.08;
      const nodeOpacity = isDark ? 0.2 : 0.12;

      // Compute grid positions
      const spreadX = 3.5;
      const spreadZ = 2.8;

      for (let r = 0; r < ROWS; r++) {
        const nz = r / (ROWS - 1);
        for (let c = 0; c < COLS; c++) {
          const nx = c / (COLS - 1);

          const worldX = (nx - 0.5) * spreadX;
          const worldZ = nz * spreadZ;
          const worldY = -volSurfaceHeight(nx, nz, time);

          const p = project(worldX, worldY, worldZ, w, h);
          grid[r][c].x = p.x;
          grid[r][c].y = p.y;
          grid[r][c].scale = p.scale;
        }
      }

      // Draw lines along tenor (z-axis) direction
      ctx.lineWidth = 0.8;
      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        const opacity = baseOpacity * (0.5 + 0.5 * (c % 2 === 0 ? 1 : 0.6));
        ctx.strokeStyle = `rgba(${LINE_COLOR_PRIMARY}, ${opacity})`;
        for (let r = 0; r < ROWS; r++) {
          const pt = grid[r][c];
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw lines along strike (x-axis) direction
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        const opacity = baseOpacity * (0.4 + 0.6 * (r % 2 === 0 ? 1 : 0.5));
        ctx.strokeStyle = `rgba(${LINE_COLOR_SECONDARY}, ${opacity})`;
        for (let c = 0; c < COLS; c++) {
          const pt = grid[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw subtle glow at intersections (sparse, every other node)
      for (let r = 0; r < ROWS; r += 2) {
        for (let c = 0; c < COLS; c += 2) {
          const pt = grid[r][c];
          const radius = 1.2 * pt.scale;

          // Subtle pulsing glow per node
          const pulse =
            0.5 + 0.5 * Math.sin(time * 0.8 + r * 0.5 + c * 0.3);
          const alpha = nodeOpacity * (0.3 + 0.7 * pulse);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(radius, 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${NODE_COLOR}, ${alpha})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: "100vw",
        height: "100vh",
      }}
      aria-hidden="true"
    />
  );
};
