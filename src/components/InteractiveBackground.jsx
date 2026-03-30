import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Nebula Orbs ─── */
const orbs = [
  {
    id: 1,
    size: 600,
    color: "radial-gradient(circle, rgba(29,78,216,0.5) 0%, rgba(10,22,40,0) 70%)",
    blur: 130,
    opacity: 0.35,
    x: ["8%", "22%", "12%", "28%", "8%"],
    y: ["5%", "22%", "38%", "12%", "5%"],
    duration: 20,
  },
  {
    id: 2,
    size: 500,
    color: "radial-gradient(circle, rgba(67,56,202,0.55) 0%, rgba(49,46,129,0.25) 40%, rgba(10,22,40,0) 70%)",
    blur: 150,
    opacity: 0.3,
    x: ["72%", "55%", "68%", "48%", "72%"],
    y: ["55%", "38%", "52%", "68%", "55%"],
    duration: 17,
  },
  {
    id: 3,
    size: 650,
    color: "radial-gradient(circle, rgba(14,116,144,0.45) 0%, rgba(29,78,216,0.18) 45%, rgba(10,22,40,0) 70%)",
    blur: 140,
    opacity: 0.25,
    x: ["38%", "52%", "32%", "48%", "38%"],
    y: ["12%", "28%", "42%", "22%", "12%"],
    duration: 24,
  },
  {
    id: 4,
    size: 400,
    color: "radial-gradient(circle, rgba(49,46,129,0.5) 0%, rgba(67,56,202,0.2) 40%, rgba(10,22,40,0) 70%)",
    blur: 120,
    opacity: 0.2,
    x: ["82%", "68%", "78%", "88%", "82%"],
    y: ["8%", "22%", "12%", "4%", "8%"],
    duration: 19,
  },
];

/* ─── Vol Surface ─── */
const COLS = 36;
const ROWS = 24;
const LINE_CYAN = "56, 189, 248";
const LINE_BLUE = "96, 165, 250";
const NODE_COLOR = "147, 197, 253";
const GLOW_COLOR = "59, 130, 246";
const LABEL_COLOR = "148, 163, 184"; // slate-400

function volSurfaceHeight(nx, nz, time, mouseInfluence) {
  const strike = (nx - 0.5) * 2;
  const tenor = nz;

  // More pronounced smile — steeper wings
  const smileWidth = 0.5 + tenor * 0.45;
  const smile = (strike * strike) / (smileWidth * smileWidth);

  // Steeper put-wing skew
  const skew = -0.2 * strike * (1 - tenor * 0.5);

  // More visible term structure
  const termStructure = tenor * 0.35;
  const baseVol = 0.2;

  // Autonomous evolving motion
  const wave =
    0.07 * Math.sin(time * 0.6 + nx * 5 + nz * 3) +
    0.05 * Math.sin(time * 0.9 - nx * 3.5 + nz * 6) +
    0.04 * Math.cos(time * 0.4 + nx * 2.5 - nz * 2.5) +
    0.03 * Math.sin(time * 1.4 + nx * 8) +
    0.025 * Math.cos(time * 0.25 + nz * 4) +
    0.02 * Math.sin(time * 1.8 - nx * 6 + nz * 2);

  const travelWave = 0.04 * Math.sin(time * 0.3 - nx * 3 + nz * 0.5);

  // Mouse ripple
  const dx = nx - mouseInfluence.nx;
  const dz = nz - mouseInfluence.nz;
  const dist = Math.sqrt(dx * dx + dz * dz);
  const ripple = mouseInfluence.active
    ? 0.12 * Math.exp(-dist * dist * 5) * Math.sin(time * 3.5 - dist * 14)
    : 0;

  return baseVol + smile * 0.6 + skew + termStructure + wave + travelWave + ripple;
}

// Blue → purple gradient: deep navy (low vol) → royal blue → violet → bright purple (high vol)
const TEMP_STOPS = [
  [8, 15, 80],      // deep navy — lowest vol
  [20, 50, 160],    // dark blue
  [40, 90, 210],    // royal blue
  [80, 100, 230],   // blue-violet
  [130, 80, 240],   // violet
  [170, 70, 230],   // purple
  [210, 120, 255],  // bright purple/lavender — highest vol
];

function lerpColor(a, b, t) {
  return [
    Math.floor(a[0] + (b[0] - a[0]) * t),
    Math.floor(a[1] + (b[1] - a[1]) * t),
    Math.floor(a[2] + (b[2] - a[2]) * t),
  ];
}

function heightToColor(h, baseOpacity) {
  const normalized = Math.max(0, Math.min(1, (h - 0.1) / 0.9));
  const pos = normalized * (TEMP_STOPS.length - 1);
  const idx = Math.min(Math.floor(pos), TEMP_STOPS.length - 2);
  const frac = pos - idx;
  const rgb = lerpColor(TEMP_STOPS[idx], TEMP_STOPS[idx + 1], frac);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${baseOpacity * (0.7 + normalized * 0.5)})`;
}

function heightToRgb(h) {
  const normalized = Math.max(0, Math.min(1, (h - 0.1) / 0.9));
  const pos = normalized * (TEMP_STOPS.length - 1);
  const idx = Math.min(Math.floor(pos), TEMP_STOPS.length - 2);
  const frac = pos - idx;
  return lerpColor(TEMP_STOPS[idx], TEMP_STOPS[idx + 1], frac);
}

function getAutoRotation(time) {
  const rotY = 0.1 * Math.sin(time * 0.08) + 0.05 * Math.sin(time * 0.13);
  const rotX = 0.06 * Math.sin(time * 0.06 + 1.0) + 0.03 * Math.cos(time * 0.1);
  return { rotX, rotY };
}

function project(x, y, z, width, height, tiltX, rotY) {
  const fov = 500;
  const cameraY = -2.2;
  const cameraZ = -1.8;

  const dx = x;
  const dy = y - cameraY;
  const dz = z - cameraZ;

  const rx1 = dx * Math.cos(rotY) - dz * Math.sin(rotY);
  const rz1 = dx * Math.sin(rotY) + dz * Math.cos(rotY);
  const ry1 = dy;

  const ry2 = ry1 * Math.cos(tiltX) - rz1 * Math.sin(tiltX);
  const rz2 = ry1 * Math.sin(tiltX) + rz1 * Math.cos(tiltX);

  const scale = fov / (fov + rz2);

  return {
    x: width * 0.5 + rx1 * scale * 240,
    y: height * 0.58 + ry2 * scale * 240,
    scale,
  };
}

const VolSurfaceCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, nx: 0.5, nz: 0.5, active: false });
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
      nx: e.clientX / window.innerWidth,
      nz: e.clientY / window.innerHeight,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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

    const grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ x: 0, y: 0, scale: 0 }))
    );

    let smoothMX = 0.5;
    let smoothMY = 0.5;

    function draw(timestamp) {
      if (!running) return;

      const time = timestamp * 0.001;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouse = mouseRef.current;

      smoothMX += (mouse.x - smoothMX) * 0.03;
      smoothMY += (mouse.y - smoothMY) * 0.03;

      // Combine autonomous rotation + mouse influence
      const auto = getAutoRotation(time);
      const mouseRotY = (smoothMX - 0.5) * 2;
      const mouseRotX = (smoothMY - 0.5) * 2;
      const finalRotY = auto.rotY + (mouse.active ? mouseRotY * 0.08 : 0);
      const finalTiltX = 0.5 + auto.rotX + (mouse.active ? mouseRotX * 0.08 : 0);

      ctx.clearRect(0, 0, w, h);

      // Fade out as user scrolls — fully gone by 1 viewport height
      const scrollFade = Math.max(0, 1 - scrollRef.current / (h * 0.8));
      if (scrollFade <= 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.globalAlpha = scrollFade;

      const isDark = !document.documentElement.classList.contains("light");
      const baseOpacity = isDark ? 0.38 : 0.18;
      const nodeOpacity = isDark ? 0.5 : 0.22;

      const spreadX = 4.5;
      const spreadZ = 3.4;

      // Store heights for coloring
      const heights = Array.from({ length: ROWS }, () => new Float32Array(COLS));

      for (let r = 0; r < ROWS; r++) {
        const nz = r / (ROWS - 1);
        for (let c = 0; c < COLS; c++) {
          const nx = c / (COLS - 1);
          const worldX = (nx - 0.5) * spreadX;
          const worldZ = nz * spreadZ;
          const h_val = volSurfaceHeight(nx, nz, time, mouse);
          heights[r][c] = h_val;
          const worldY = -h_val;
          const p = project(worldX, worldY, worldZ, w, h, finalTiltX, finalRotY);
          grid[r][c].x = p.x;
          grid[r][c].y = p.y;
          grid[r][c].scale = p.scale;
        }
      }

      // Draw colored quad fills for surface shading
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const avgH = (heights[r][c] + heights[r+1][c] + heights[r][c+1] + heights[r+1][c+1]) / 4;
          ctx.beginPath();
          ctx.moveTo(grid[r][c].x, grid[r][c].y);
          ctx.lineTo(grid[r][c+1].x, grid[r][c+1].y);
          ctx.lineTo(grid[r+1][c+1].x, grid[r+1][c+1].y);
          ctx.lineTo(grid[r+1][c].x, grid[r+1][c].y);
          ctx.closePath();
          ctx.fillStyle = heightToColor(avgH, baseOpacity * 0.35);
          ctx.fill();
        }
      }

      // Tenor lines (colored by height)
      ctx.lineWidth = 1.3;
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          const pt1 = grid[r][c];
          const pt2 = grid[r+1][c];
          const avgH = (heights[r][c] + heights[r+1][c]) / 2;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = heightToColor(avgH, baseOpacity * (c % 2 === 0 ? 1.0 : 0.6));
          ctx.stroke();
        }
      }

      // Strike lines (colored by height)
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const pt1 = grid[r][c];
          const pt2 = grid[r][c+1];
          const avgH = (heights[r][c] + heights[r][c+1]) / 2;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.strokeStyle = heightToColor(avgH, baseOpacity * (r % 2 === 0 ? 0.9 : 0.5));
          ctx.stroke();
        }
      }

      // Glow nodes at peaks — temperature colored
      for (let r = 0; r < ROWS; r += 2) {
        for (let c = 0; c < COLS; c += 2) {
          const pt = grid[r][c];
          const hVal = heights[r][c];
          const normalized = Math.max(0, Math.min(1, (hVal - 0.2) / 0.8));
          const radius = (1.2 + normalized * 1.5) * pt.scale;
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.0 + r * 0.5 + c * 0.3);
          const alpha = nodeOpacity * (0.2 + 0.8 * pulse) * (0.3 + normalized * 0.7);
          const nodeRgb = heightToRgb(hVal);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(radius, 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${nodeRgb[0]}, ${nodeRgb[1]}, ${nodeRgb[2]}, ${alpha})`;
          ctx.fill();
        }
      }

      // Axis labels
      const labelAlpha = isDark ? 0.3 : 0.15;
      ctx.font = "13px 'SF Mono', 'Fira Code', 'Courier New', monospace";
      ctx.fillStyle = `rgba(${LABEL_COLOR}, ${labelAlpha})`;

      // Strike axis label (bottom-right edge)
      const strikeLabel = grid[ROWS - 1][COLS - 3];
      ctx.textAlign = "right";
      ctx.fillText("Strike →", strikeLabel.x + 10, strikeLabel.y + 22);

      // DTE axis label (bottom-left edge)
      const dteLabel = grid[ROWS - 1][2];
      ctx.textAlign = "left";
      ctx.fillText("← DTE", dteLabel.x - 10, dteLabel.y + 22);

      // IV axis label (top, near peak)
      ctx.font = "14px 'SF Mono', 'Fira Code', 'Courier New', monospace";
      ctx.fillStyle = `rgba(${LABEL_COLOR}, ${labelAlpha * 1.2})`;
      const ivLabel = grid[0][Math.floor(COLS / 2)];
      ctx.textAlign = "center";
      ctx.fillText("Implied Volatility", ivLabel.x, ivLabel.y - 20);

      // Mouse glow
      if (mouse.active) {
        const glowX = smoothMX * w;
        const glowY = smoothMY * h;
        const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 250);
        gradient.addColorStop(0, `rgba(${GLOW_COLOR}, ${isDark ? 0.12 : 0.06})`);
        gradient.addColorStop(1, `rgba(${GLOW_COLOR}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
};

/* ─── Combined Background ─── */
export const InteractiveBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Nebula orbs */}
      <div className="absolute inset-0 opacity-40 dark:opacity-100 transition-opacity duration-500">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            animate={{ x: orb.x, y: orb.y }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              width: orb.size,
              height: orb.size,
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              opacity: orb.opacity,
              willChange: "transform",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* Vol surface */}
      <VolSurfaceCanvas />
    </div>
  );
};
