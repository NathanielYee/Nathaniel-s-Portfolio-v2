import { useState } from "react";
import { cn } from "@/lib/utils";

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

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-8 rounded-xl shadow-lg card-hover text-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Logo */}
              {skill.logo && (
                <div className="flex justify-center mb-6">
                  <img 
                    src={skill.logo} 
                    alt={`${skill.name} logo`}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if logo fails to load
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};