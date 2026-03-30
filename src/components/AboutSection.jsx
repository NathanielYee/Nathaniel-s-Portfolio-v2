import { Briefcase, Code, CandlestickChart, GraduationCap } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const timelineEntries = [
  {
    title: "S&T Intern @",
    linkText: " UBS Securities",
    href: "https://www.ubs.com",
    subtitle: "Jan 2026 – Present",
    bullets: [
      "Building Retail Market Making and Short Interest Equity Derivative models to forecast anticipated flows and analyze deviations in trading activity across sectors.",
      "Creating Delta Hedging transaction cost platform for Index Volatility Trading to analyze costs when hedging via spot and futures trades.",
    ],
    icon: CandlestickChart,
    current: true,
  },
  {
    title: "Quant Trading Research Co-op @",
    linkText: " Wellington Management",
    href: "https://www.wellington.com/en",
    subtitle: "Jan 2025 – Aug 2025",
    bullets: [
      "Developed full-stack FX slippages dashboard with dynamic filtering for broker-dealer, venue, and algo-strategy — enabling real-time analysis of toxic flows and markouts.",
      "Designed pre-trade cost models for futures and muni bonds using Python, SQL, XGBoost, and Plotly Dash.",
      "Automated daily Commodity and FX futures reporting via Python + Office API, eliminating 2-3 hours of manual work daily.",
    ],
    icon: Code,
    current: false,
  },
  {
    title: "Actuarial Co-op @",
    linkText: " John Hancock",
    href: "https://www.johnhancock.com",
    subtitle: "Jan 2024 – Jun 2024",
    bullets: [
      "Generated Daily Production Reports tracking ~$100M in daily transactions for the U.S. CFO and CEO using Excel, PowerBI, and SQL Server.",
      "Automated 300 manual model inputs on quarterly CSM Reconciliation reports using VBA.",
    ],
    icon: Briefcase,
    current: false,
  },
  {
    title: "President of",
    linkText: " NU Systematic Alpha",
    href: "https://www.nusystematicalpha.com/",
    subtitle: "Sep 2024 – Present",
    bullets: [
      "Deliver lectures on asset valuation, factor modeling, probability theory, and regression techniques.",
      "Lead researchers using weather, satellite imaging, and supply/demand data to build a factor model predicting spot Oil prices.",
    ],
    icon: GraduationCap,
    current: false,
  },
];

const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const TimelineDot = () => (
  <div className="relative flex items-center justify-center z-10">
    <span className="relative h-4 w-4 rounded-full border-2 border-primary bg-background" />
  </div>
);

export const AboutSection = () => {
  const timelineRef = useRef(null);
  const dotRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotOffsets, setDotOffsets] = useState([]);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.6", "end 0.4"],
  });

  // Measure actual dot positions relative to the timeline container
  const measureDots = useCallback(() => {
    if (!timelineRef.current || dotRefs.current.length === 0) return;
    const containerTop = timelineRef.current.getBoundingClientRect().top + window.scrollY;
    const offsets = dotRefs.current.map((ref) => {
      if (!ref) return 0;
      const rect = ref.getBoundingClientRect();
      return rect.top + window.scrollY - containerTop + rect.height / 2;
    });
    setDotOffsets(offsets);
  }, []);

  useEffect(() => {
    measureDots();
    window.addEventListener("resize", measureDots);
    const timeout = setTimeout(measureDots, 500);
    return () => {
      window.removeEventListener("resize", measureDots);
      clearTimeout(timeout);
    };
  }, [measureDots]);

  // Map scroll progress to snapping between dot positions
  const numEntries = timelineEntries.length;
  const inputStops = [];
  const outputIndices = [];
  for (let i = 0; i < numEntries; i++) {
    const arriveAt = Math.max(0, (i - 0.05) / Math.max(1, numEntries - 1));
    const leaveAt = Math.min(1, (i + 0.25) / Math.max(1, numEntries - 1));
    inputStops.push(arriveAt, leaveAt);
    outputIndices.push(i, i);
  }
  const activeIndexMotion = useTransform(scrollYProgress, inputStops, outputIndices);

  useMotionValueEvent(activeIndexMotion, "change", (v) => {
    setActiveIndex(Math.round(v));
  });

  const currentOffset = dotOffsets.length > 0 ? dotOffsets[Math.min(activeIndex, dotOffsets.length - 1)] : 0;

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        {/* Top section: photo + bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* Photo with animated border glow */}
          <motion.div
            className="flex justify-center"
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative group">
              {/* Animated glow ring */}
              <div
                className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60 opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 4s ease infinite",
                }}
              />
              <img
                src="/images/melondon.jpg"
                alt="Nathaniel Yee"
                className="relative w-72 h-48 md:w-96 md:h-64 rounded-xl object-cover border-2 border-primary/30 shadow-2xl
                           hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>

          {/* Bio text + buttons */}
          <motion.div
            className="space-y-6"
            variants={fadeSlideUp}
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl font-semibold">
              Quantitative Trading & Research
            </h3>

            <p className="text-muted-foreground">
              I build tools and models at the intersection of data science and
              financial markets — from volatility surfaces and options pricing
              to execution analytics and portfolio risk.
            </p>

            <p className="text-muted-foreground">
              With experience on sell-side trading desks and a foundation in
              statistics and mathematics, I'm focused on turning market data
              into actionable insight.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <a
                href="mailto:yee.n@northeastern.edu?subject=Getting%20In%20Touch&body=Hi%20Nathaniel,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0D%0A%0D%0ABest%20regards,"
                className="cosmic-button"
              >
                Get In Touch
              </a>

              <a
                href="/Nathaniel Yee's Resume Summer 2026.pdf"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Timeline heading */}
        <motion.h3
          className="text-2xl font-semibold mb-10 text-center"
          variants={fadeSlideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Professional <span className="text-primary">Journey</span>
        </motion.h3>

        {/* Vertical timeline */}
        <div className="relative max-w-2xl mx-auto" ref={timelineRef}>
          {/* Vertical line — centered on the 40px-wide dot column */}
          <div className="absolute left-[20px] -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

          {/* Scroll-tracking progress line */}
          <motion.div
            className="absolute left-[20px] -translate-x-1/2 top-2 w-px bg-gradient-to-b from-primary to-primary/80"
            animate={{ height: currentOffset }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ originY: 0 }}
          />

          {/* Scroll-tracking pulsing dot — snaps to each entry's dot position */}
          <motion.div
            className="absolute left-[20px] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
            animate={{ top: currentOffset }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <span className="absolute h-7 w-7 rounded-full bg-primary/25 animate-ping" />
            <span className="relative h-4 w-4 rounded-full bg-primary border-2 border-primary shadow-[0_0_14px_rgba(59,130,246,0.6)]" />
          </motion.div>

          <div className="flex flex-col gap-10">
            {timelineEntries.map((entry, index) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-start gap-6"
                  variants={fadeSlideUp}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Dot on the timeline */}
                  <div
                    className="mt-6 flex-shrink-0 w-10 flex justify-center"
                    ref={(el) => { dotRefs.current[index] = el; }}
                  >
                    <TimelineDot />
                  </div>

                  {/* Card */}
                  <div className="gradient-border p-6 card-hover flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-lg">
                          {entry.title}
                          <a
                            href={entry.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors duration-300 underline decoration-primary/30 hover:decoration-primary/60"
                          >
                            {entry.linkText}
                          </a>
                        </h4>
                        {entry.subtitle && (
                          <p className="text-sm text-muted-foreground/70 mt-0.5">{entry.subtitle}</p>
                        )}
                        <ul className="mt-2 space-y-1.5">
                          {entry.bullets.map((bullet, i) => (
                            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-primary/60 mt-1 flex-shrink-0">&#8226;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyframes for the photo glow animation */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};
