import { Briefcase, Code, CandlestickChart } from "lucide-react";
import { motion } from "framer-motion";

const timelineEntries = [
  {
    title: "Currently @",
    linkText: " UBS",
    href: "https://www.ubs.com",
    description:
      "Global Markets Sales & Trading — Equity Derivatives Strategy, Index Flow Volatility Trading, and Knowledge Network.",
    icon: CandlestickChart,
    current: true,
  },
  {
    title: "Prev: @",
    linkText: " Wellington Management",
    href: "https://www.wellington.com/en",
    description:
      "Conducted multi-asset global execution research, pre-trade cost models, and TCA.",
    icon: Code,
    current: false,
  },
  {
    title: "President of",
    linkText: " NU Systematic Alpha",
    href: "https://www.nusystematicalpha.com/",
    description:
      "Leading a team of Quantitative Researchers to find alpha using alternative data and statistical methods.",
    icon: Briefcase,
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

const TimelineDot = ({ current }) => (
  <div className="relative flex items-center justify-center z-10">
    {current && (
      <span className="absolute h-6 w-6 rounded-full bg-primary/30 animate-ping" />
    )}
    <span
      className={`relative h-4 w-4 rounded-full border-2 border-primary ${
        current ? "bg-primary shadow-[0_0_12px_rgba(var(--primary-rgb,99,102,241),0.6)]" : "bg-background"
      }`}
    />
  </div>
);

export const AboutSection = () => {
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
              Curious and Passionate Student
            </h3>

            <p className="text-muted-foreground">
              After taking my first data science class freshman year at
              Northeastern. I was hooked, ever since I've strived to create new
              and exciting projects.
            </p>

            <p className="text-muted-foreground">
              I'm passionate about applying statistical and machine learning
              models to financial markets, to make sense of market volatility.
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
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line — centered on the 40px-wide dot column */}
          <div className="absolute left-[20px] -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

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
                  <div className="mt-6 flex-shrink-0 w-10 flex justify-center">
                    <TimelineDot current={entry.current} />
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
                        <p className="text-muted-foreground mt-1">
                          {entry.description}
                        </p>
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
