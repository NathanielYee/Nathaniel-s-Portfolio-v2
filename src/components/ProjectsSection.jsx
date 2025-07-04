import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Options Visualizer",
        description: "An options price visualizer and calculator based on Black-Scholes Model.",
        image: "/images/bsm.png",
        tags: ["Streamlit", "Pandas", "Numpy", "Seaborn"],
        demoUrl: "https://nathanielyee-options-visualizer-main-tvrddq.streamlit.app/",
        githubUrl: "https://github.com/NathanielYee/Options-Visualizer",
    },
  {
    id: 2,
    title: "Reddit Sentiment Analysis On Stock Market Returns and Volatility ",
    description:
      "A data science approach to understanding the correlation between stock sentiment on reddit and anticipated direction of the market",
    image: "images/SentvsVolatility",
    tags: ["Python", "YFinance API", "PRAW API", "Seaborn","Sci-Py"],
    demoUrl: "https://github.com/NathanielYee/reddit_analysis-correlation_model/blob/main/Stock%20Market%20Analysis%20Project.py",
    githubUrl: "https://github.com/NathanielYee/reddit_analysis-correlation_model",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "This portfolio website made with react.js and tailwind css.",
    image: "/images/portfolio.png",
    tags: ["React", "TailwindCSS", "Vite"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was driven by personal curiousity,
          crafted with attention to detail, and designed for performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/NathanielYee"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};