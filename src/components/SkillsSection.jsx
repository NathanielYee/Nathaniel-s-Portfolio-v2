import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  // Technologies
  {
    name: "Python",
    category: "Technologies",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "MySQL",
    category: "Technologies",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    name: "VBA",
    category: "Technologies"
  },
  {
    name: "React",
    category: "Technologies",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Tableau",
    category: "Technologies",
    logo: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png"
  },
  {
    name: "Tailwind CSS",
    category: "Technologies",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
  },
  {
    name: "HTML/CSS",
    category: "Technologies",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },

  // Packages
  {
    name: "Pandas",
    category: "Packages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"
  },
  {
    name: "Seaborn",
    category: "Packages",
    logo: "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg"
  },
  {
    name: "Statsmodels",
    category: "Packages",
    logo: "https://www.statsmodels.org/stable/_images/statsmodels-logo-v2-horizontal.svg"
  },
  {
    name: "NLTK",
    category: "Packages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    name: "Altair",
    category: "Packages",
    logo: "https://altair-viz.github.io/_static/altair-logo-light.png"
  },
  {
    name: "Streamlit",
    category: "Packages",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg"
  },
  {
    name: "Sci-Kit Learn",
    category: "Packages",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"
  },
  {
    name: "XGBoost",
    category: "Packages",
    logo: "https://raw.githubusercontent.com/dmlc/dmlc.github.io/master/img/logo-m/xgboost.png"
  },

  // Tools
  {
    name: "KDB+/Q",
    category: "Technologies",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Kx_logo.svg"
  },
  {
    name: "Bloomberg Terminal",
    category: "tools",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bloomberg_logo.svg"
  },
  {
    name: "Claude Code",
    category: "tools",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg"
  },
  {
    name: "Git/GitHub",
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
  },
  {
    name: "Docker",
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  },
  {
    name: "Figma",
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
  },
  {
    name: "VS Code",
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
  },
  {
    name: "PyCharm",
    category: "tools",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg"
  }
];

const categories = ["all", "Technologies", "Packages", "tools"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30 overflow-hidden">

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-primary"> Skills</span>
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {categories.map((category, key) => (
            <motion.button
              key={key}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                layout
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 12px 28px -6px hsl(var(--primary) / 0.18), 0 4px 12px -2px hsl(var(--primary) / 0.10)",
                }}
                className="bg-card p-8 rounded-xl shadow-lg text-center group transition-colors duration-300 cursor-default"
              >
                {/* Logo */}
                {skill.logo && (
                  <div className="flex justify-center mb-6">
                    <img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Skill Name */}
                <div>
                  <h3 className="font-semibold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
