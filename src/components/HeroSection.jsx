import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DecodeReveal } from "../components/DecodeReveal";
import { ChevronsDown } from "lucide-react";

const SUBTITLES = [
  "Quantitative Trading",
  "Market Microstructure",
  "Data Science & Finance",
  "Volatility Research",
];

const SUBTITLE_INTERVAL = 3000;

/* ---------- Dot‑Grid Background ---------- */
const DOT_ROWS = 12;
const DOT_COLS = 20;

const DotGrid = () => {
  const dots = useMemo(() => {
    const arr = [];
    for (let r = 0; r < DOT_ROWS; r++) {
      for (let c = 0; c < DOT_COLS; c++) {
        arr.push({
          id: `${r}-${c}`,
          cx: (c / (DOT_COLS - 1)) * 100,
          cy: (r / (DOT_ROWS - 1)) * 100,
          delay: (r + c) * 0.12,
        });
      }
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        className="w-full h-full opacity-[0.07]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {dots.map((d) => (
          <motion.circle
            key={d.id}
            cx={d.cx}
            cy={d.cy}
            r="0.25"
            fill="currentColor"
            className="text-primary"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

/* ---------- Rotating Subtitle ---------- */
const RotatingSubtitle = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % SUBTITLES.length),
      SUBTITLE_INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-9 md:h-10 relative flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={SUBTITLES[index]}
          className="absolute text-lg md:text-2xl font-medium tracking-wide text-primary"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {SUBTITLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/* ---------- Hero Section ---------- */
export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="relative z-10 space-y-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <DecodeReveal text="Hi," delay={0} />
          <span> </span>
          <DecodeReveal text="I'm " delay={400} />
          <span> </span>
          <DecodeReveal text="Nathaniel" delay={800} />
          <span> </span>
          <DecodeReveal text="Yee" delay={1600} />
        </h1>

        <div className="opacity-0 animate-fade-in-delay-3">
          <RotatingSubtitle />
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-0 opacity-0 animate-fade-in-delay-3">
          Northeastern student in Data Science, Finance, and Mathematics
          exploring quantitative trading and research. Currently working as a
          Global Markets Sales & Trading intern at UBS.
        </p>

        <div className="pt-4 opacity-0 animate-fade-in-delay-4">
          <a href="#projects" className="cosmic-button">
            View My Work
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in-delay-4">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ChevronsDown className="h-5 w-5 text-primary animate-bounce" />
      </div>
    </section>
  );
};
