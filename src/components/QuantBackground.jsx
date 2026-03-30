import { useEffect, useRef, useCallback, useState } from "react";

const GREEKS = ["Δ", "Γ", "Θ", "ν", "ρ"];

/* ─── Greek Letter Particles ─── */
const GreekParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 35000);
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        char: GREEKS[Math.floor(Math.random() * GREEKS.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 22 + 18,
        opacity: Math.random() * 0.1 + 0.2,
        driftX: (Math.random() - 0.5) * 35,
        driftY: (Math.random() - 0.5) * 25,
        driftDuration: Math.random() * 30 + 20,
        rotateAmount: (Math.random() - 0.5) * 50,
        pulseDuration: Math.random() * 5 + 3,
        hue: 200 + Math.random() * 40,
      });
    }
    setParticles(arr);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={`greek-${p.id}`}
          style={{
            position: "absolute",
            left: p.x + "%",
            top: p.y + "%",
            fontSize: p.size + "px",
            fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
            color: `hsla(${p.hue}, 80%, 80%, ${p.opacity})`,
            textShadow: `0 0 24px hsla(${p.hue}, 90%, 75%, ${p.opacity * 0.8}), 0 0 48px hsla(${p.hue}, 80%, 65%, ${p.opacity * 0.4})`,
            fontWeight: 700,
            animation: `greek-drift-${p.id} ${p.driftDuration}s ease-in-out infinite, greek-pulse ${p.pulseDuration}s ease-in-out infinite`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {p.char}
        </div>
      ))}
      <style>{`
        @keyframes greek-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        ${particles.map((p) => `
          @keyframes greek-drift-${p.id} {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(${p.driftX * 0.6}px, ${p.driftY * 0.4}px) rotate(${p.rotateAmount * 0.5}deg); }
            66% { transform: translate(${p.driftX}px, ${p.driftY}px) rotate(${p.rotateAmount}deg); }
          }
        `).join("")}
      `}</style>
    </>
  );
};

/* ─── Stochastic Path Traces (Enhanced) ─── */
const StochasticPaths = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const pathsRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const generatePath = useCallback((w, h, existing) => {
    // Generate sparse control points, then we'll draw smooth curves through them
    const controlPoints = [];
    const startY = h * (0.1 + Math.random() * 0.8);
    let y = startY;
    const numControls = 40 + Math.floor(Math.random() * 20);
    const stepX = (w + 200) / numControls;
    const volatility = 8 + Math.random() * 12;
    const drift = (Math.random() - 0.5) * 1.5;

    for (let s = 0; s <= numControls; s++) {
      controlPoints.push({ x: -100 + s * stepX, y });
      const dW = (Math.random() - 0.5) * 2;
      y += drift + volatility * dW;
    }

    // Interpolate smooth points between control points using Catmull-Rom
    const points = [];
    const resolution = 6; // points between each control point
    for (let i = 0; i < controlPoints.length - 1; i++) {
      const p0 = controlPoints[Math.max(0, i - 1)];
      const p1 = controlPoints[i];
      const p2 = controlPoints[i + 1];
      const p3 = controlPoints[Math.min(controlPoints.length - 1, i + 2)];

      for (let t = 0; t < resolution; t++) {
        const frac = t / resolution;
        const tt = frac * frac;
        const ttt = tt * frac;
        // Catmull-Rom spline
        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * frac +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * ttt
        );
        const yy = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * frac +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * ttt
        );
        points.push({ x, y: yy });
      }
    }
    points.push(controlPoints[controlPoints.length - 1]);

    return {
      points,
      speed: 0.08 + Math.random() * 0.12,
      baseOpacity: 0.07 + Math.random() * 0.08,
      hue: 170 + Math.random() * 20,
      width: 1.0 + Math.random() * 1.0,
      drawProgress: existing ? 0 : Math.random() * 100,
      glowWidth: 3 + Math.random() * 4,
    };
  }, []);

  const initPaths = useCallback((w, h) => {
    const paths = [];
    for (let i = 0; i < 8; i++) {
      paths.push(generatePath(w, h));
    }
    pathsRef.current = paths;
  }, [generatePath]);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPaths(window.innerWidth, window.innerHeight);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!running) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const isDark = !document.documentElement.classList.contains("light");
      const m = isDark ? 1 : 0.5;
      // Green hue in dark mode, teal in light
      const hueShift = isDark ? 150 : 180;

      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      pathsRef.current.forEach((path) => {
        const hue = hueShift + (path.hue - 170);
        path.drawProgress += path.speed;

        if (path.drawProgress > path.points.length + 80) {
          Object.assign(path, generatePath(w, h, true));
          return;
        }

        // Smooth fractional head position
        const headPos = Math.min(path.drawProgress, path.points.length - 1);
        const drawEnd = Math.floor(headPos);
        const trailLength = 180;
        const fadeStart = Math.max(0, drawEnd - trailLength);

        if (drawEnd < 3) return;

        // Interpolate exact head position between two points
        const headFrac = headPos - drawEnd;
        const headPt = drawEnd < path.points.length - 1
          ? {
              x: path.points[drawEnd].x + (path.points[drawEnd + 1].x - path.points[drawEnd].x) * headFrac,
              y: path.points[drawEnd].y + (path.points[drawEnd + 1].y - path.points[drawEnd].y) * headFrac,
            }
          : path.points[drawEnd];

        // Draw single smooth path with gradient via globalAlpha chunks (3 bands)
        const bands = [
          { start: fadeStart, end: fadeStart + Math.floor(trailLength * 0.4), alpha: 0.25 },
          { start: fadeStart + Math.floor(trailLength * 0.4), end: fadeStart + Math.floor(trailLength * 0.75), alpha: 0.55 },
          { start: fadeStart + Math.floor(trailLength * 0.75), end: drawEnd, alpha: 1.0 },
        ];

        bands.forEach((band) => {
          const s = Math.max(band.start, fadeStart);
          const e = Math.min(band.end, drawEnd);
          if (e - s < 2) return;

          ctx.beginPath();
          ctx.moveTo(path.points[s].x, path.points[s].y);
          for (let i = s + 1; i <= e; i++) {
            ctx.lineTo(path.points[i].x, path.points[i].y);
          }
          // Add interpolated head to the last band
          if (band.end >= drawEnd) {
            ctx.lineTo(headPt.x, headPt.y);
          }

          const alpha = path.baseOpacity * band.alpha * m;
          ctx.strokeStyle = `hsla(${hue}, 65%, ${isDark ? 72 : 55}%, ${alpha})`;
          ctx.lineWidth = path.width;
          ctx.stroke();
        });

        // Soft glow behind the head (single path, last 80 points)
        const glowStart = Math.max(fadeStart, drawEnd - 80);
        ctx.beginPath();
        ctx.moveTo(path.points[glowStart].x, path.points[glowStart].y);
        for (let i = glowStart + 1; i <= drawEnd; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.lineTo(headPt.x, headPt.y);
        ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${path.baseOpacity * 0.3 * m})`;
        ctx.lineWidth = path.glowWidth;
        ctx.stroke();

        // Head bloom
        const headAlpha = path.baseOpacity * 3.5 * m;
        const grad = ctx.createRadialGradient(headPt.x, headPt.y, 0, headPt.x, headPt.y, 14);
        grad.addColorStop(0, `hsla(${hue}, 80%, 88%, ${headAlpha * 0.5})`);
        grad.addColorStop(1, `hsla(${hue}, 80%, 88%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(headPt.x - 14, headPt.y - 14, 28, 28);

        // Core dot
        ctx.beginPath();
        ctx.arc(headPt.x, headPt.y, path.width + 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 92%, ${headAlpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [initPaths, generatePath]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
};

/* ─── Combined Quant Background ─── */
export const QuantBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      setScrollProgress(Math.min(1, window.scrollY / (vh * 0.6)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, (scrollProgress - 0.15) / 0.5);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ opacity, transition: "opacity 0.3s ease-out" }}
    >
      <StochasticPaths />
      <GreekParticles />
    </div>
  );
};
