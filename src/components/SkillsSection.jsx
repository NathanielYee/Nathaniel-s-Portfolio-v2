import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const skills = [
  // Technologies
  { name: "Python", category: "Technologies", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", primary: true },
  { name: "KDB+/Q", category: "Technologies", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Kx_logo.svg", primary: true },
  { name: "MySQL", category: "Technologies", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "React", category: "Technologies", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", category: "Technologies", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "HTML/CSS", category: "Technologies", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "VBA", category: "Technologies" },
  { name: "Tableau", category: "Technologies", logo: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png" },

  // Packages
  { name: "Pandas", category: "Packages", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", primary: true },
  { name: "Sci-Kit Learn", category: "Packages", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", primary: true },
  { name: "XGBoost", category: "Packages", logo: "https://raw.githubusercontent.com/dmlc/dmlc.github.io/master/img/logo-m/xgboost.png" },
  { name: "Statsmodels", category: "Packages", logo: "https://www.statsmodels.org/stable/_images/statsmodels-logo-v2-horizontal.svg" },
  { name: "Streamlit", category: "Packages", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
  { name: "Seaborn", category: "Packages", logo: "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg" },
  { name: "Plotly", category: "Packages", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/plotly/plotly-original.svg" },
  { name: "SciPy", category: "Packages", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/SCIPY_2.svg" },
  { name: "NLTK", category: "Packages", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Altair", category: "Packages", logo: "https://altair-viz.github.io/_static/altair-logo-light.png" },

  // Tools
  { name: "Bloomberg Terminal", category: "Tools", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bloomberg_logo.svg", primary: true },
  { name: "Dremio", category: "Tools" },
  { name: "Git/GitHub", category: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Docker", category: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Claude Code", category: "Tools", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg" },
  { name: "Microsoft Suite", category: "Tools" },
  { name: "Figma", category: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "VS Code", category: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "PyCharm", category: "Tools", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
];

const categories = ["All", "Technologies", "Packages", "Tools"];

const SkillCard = ({ skill }) => {
  const isPrimary = skill.primary;
  return (
    <motion.div
      className="flex-shrink-0 group select-none"
      whileHover={{ y: -8, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={cn(
        "relative flex flex-col items-center gap-3 py-5 px-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 overflow-hidden",
        isPrimary
          ? "w-36 md:w-40 bg-card border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.12)] hover:border-primary hover:shadow-[0_0_32px_rgba(59,130,246,0.3)]"
          : "w-28 md:w-32 bg-card/80 border-border/50 hover:border-primary/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.2)]"
      )}>
        {/* Subtle gradient shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Primary badge */}
        {isPrimary && (
          <div className="absolute top-1.5 right-1.5">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
          </div>
        )}

        {skill.logo ? (
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            className={cn(
              "object-contain group-hover:scale-115 transition-transform duration-300 pointer-events-none relative z-10",
              isPrimary ? "w-14 h-14" : "w-11 h-11"
            )}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : (
          <div className={cn(
            "rounded-xl bg-primary/10 flex items-center justify-center relative z-10 group-hover:bg-primary/20 transition-colors duration-300",
            isPrimary ? "w-14 h-14" : "w-11 h-11"
          )}>
            <span className="text-primary font-bold text-lg">{skill.name[0]}</span>
          </div>
        )}
        <span className={cn(
          "font-medium whitespace-nowrap group-hover:text-primary transition-colors duration-300 text-center leading-tight relative z-10",
          isPrimary ? "text-sm text-foreground" : "text-xs text-foreground/80"
        )}>
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  const filtered = skills.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  // Sort: primary skills first
  const sorted = [...filtered].sort((a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0));
  const duplicated = [...sorted, ...sorted, ...sorted, ...sorted];

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Technologies, libraries, and tools I work with
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_rgba(59,130,246,0.3)]"
                  : "text-foreground/70 hover:bg-card hover:text-foreground border border-border/50"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Single carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="relative group/carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Fade edges with gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />

              {/* Arrows */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/90 border border-border/50 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
              >
                <ChevronLeft className="h-5 w-5 text-foreground/70" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/90 border border-border/50 shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]"
              >
                <ChevronRight className="h-5 w-5 text-foreground/70" />
              </button>

              {/* Scrollable track */}
              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div
                  className="flex gap-4 px-16 md:px-28 py-6 w-max"
                  style={{
                    animation: isPaused ? "none" : `marquee-left ${activeCategory === "All" ? 60 : 30}s linear infinite`,
                  }}
                >
                  {duplicated.map((skill, i) => (
                    <SkillCard key={`${skill.name}-${i}`} skill={skill} />
                  ))}
                </div>
              </div>

              {/* Hint */}
              <div className={cn(
                "text-center mt-2 text-xs text-muted-foreground/50 transition-opacity duration-300",
                isPaused ? "opacity-100" : "opacity-0"
              )}>
                scroll or use arrows to browse
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Skill count badge */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-medium text-muted-foreground/60 border border-border/30 bg-card/50">
            {filtered.length} {activeCategory === "All" ? "skills" : activeCategory.toLowerCase()}
          </span>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
