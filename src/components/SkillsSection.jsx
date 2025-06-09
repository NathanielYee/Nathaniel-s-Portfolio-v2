import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Technologies
  { name: "Python", level: 95, category: "Technologies" },
  { name: "SQL", level: 90, category: "Technologies" },
  { name: "VBA", level: 90, category: "Technologies" },
  { name: "React", level: 90, category: "Technologies" },
  { name: "Tableau", level: 85, category: "Technologies" },
  { name: "Tailwind CSS", level: 90, category: "Technologies" },
  { name: "HTML/CSS", level: 80, category: "Technologies" },

  // Packages
  { name: "Pandas", level: 80, category: "Packages" },
  { name: "Seaborn", level: 75, category: "Packages" },
  { name: "NLTK", level: 70, category: "Packages" },
  { name: "Altair", level: 65, category: "Packages" },
  { name: "Streamlit", level: 60, category: "Packages" },
  { name: "Sci-Kit Learn", level: 60, category: "Packages" },
  { name: "XGBoost", level: 60, category: "Packages" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "PyCharm", level: 95, category: "tools" }
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
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};