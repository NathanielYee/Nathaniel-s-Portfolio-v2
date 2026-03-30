import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Portfolio Performance Dashboard",
    description:
      "An interactive portfolio analytics tool with real-time tracking, Monte Carlo simulations, risk metrics, and benchmark comparison.",
    image: "/images/portfolioviz.png",
    tags: ["Streamlit", "Plotly", "Pandas", "NumPy", "yFinance"],
    demoUrl: "https://portfolioperformancedash.streamlit.app/",
    githubUrl: "https://github.com/NathanielYee/Portfolio_Performance_Dash",
  },
  {
    id: 2,
    title: "Black-Scholes Scenario Analysis Visualizer",
    description: "Options price calculator with dynamic scenario analysis and heatmaps showing the effect of changing spot price and volatility on Call/Put prices using the Black-Scholes model.",
    image: "/images/bsm.png",
    tags: ["Streamlit", "NumPy", "Seaborn", "Black-Scholes"],
    demoUrl: "https://nathanielyee-options-visualizer-main-tvrddq.streamlit.app/",
    githubUrl: "https://github.com/NathanielYee/Options-Visualizer",
  },
  {
    id: 3,
    title: "Reddit Sentiment vs. Market Volatility",
    description: "Quantitative analysis of r/wallstreetbets sentiment on market returns and volatility. Found significant increase in volatility (p < 0.05) during negative sentiment periods, with no significant impact on risk-adjusted returns.",
    image: "images/SentvsVolatility",
    tags: ["Python", "yFinance", "PRAW", "SciPy", "NLTK"],
    demoUrl: "https://github.com/NathanielYee/reddit_analysis-correlation_model/blob/main/Stock%20Market%20Analysis%20Project.py",
    githubUrl: "https://github.com/NathanielYee/reddit_analysis-correlation_model",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "This site — built with React, Tailwind CSS, and Framer Motion. Features an interactive vol surface background and stochastic path animations.",
    image: "/images/portfolio.png",
    tags: ["React", "TailwindCSS", "Framer Motion", "Canvas"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

const featuredProject = projects[0];
const remainingProjects = projects.slice(1);

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
        >
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Here are some of my recent projects. Each project was driven by personal curiousity,
          crafted with attention to detail, and designed for performance.
        </motion.p>

        {/* Featured / Spotlight Card */}
        <motion.a
          href={featuredProject.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="block mb-12 group relative rounded-xl overflow-hidden gradient-border cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(59,130,246,0.12) 100%)",
            boxShadow:
              "0 0 40px rgba(99,102,241,0.15), 0 0 80px rgba(168,85,247,0.08)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <span className="text-white text-lg font-semibold tracking-wide">
                  {featuredProject.title}
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full mb-4 w-fit">
                Featured Project
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {featuredProject.title}
              </h3>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={featuredProject.demoUrl}
                  target="_blank"
                  className="cosmic-button inline-flex items-center gap-2 text-sm"
                >
                  Live Demo <ExternalLink size={14} />
                </a>
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300 text-sm font-medium"
                >
                  <Github size={18} /> Source Code
                </a>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Remaining Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm text-center px-4">
                    {project.title}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/NathanielYee"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
