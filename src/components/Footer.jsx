import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative py-10 px-4">

      <motion.div
        className="container mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name + tagline */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-foreground/80">
              Nathaniel <span className="text-primary">Yee</span>
            </p>
            <p className="text-xs text-muted-foreground/50 mt-0.5">
              Quantitative Trading & Research
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:yee.n@northeastern.edu"
              className="p-2 rounded-full text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/nathaniel-yee/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/NathanielYee"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          {/* Built with */}
          <p className="text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} &middot; Built with React & Tailwind
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
