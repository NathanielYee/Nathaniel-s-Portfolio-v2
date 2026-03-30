import { motion } from "framer-motion";

export const SectionDivider = ({ variant = "default" }) => {
  if (variant === "wave") {
    return (
      <div className="relative h-16 -my-8 z-10">
        <svg className="w-full h-full" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <motion.path
            d="M0,32 C360,0 720,64 1080,32 C1260,16 1380,40 1440,32 L1440,64 L0,64 Z"
            fill="hsl(var(--background))"
            className="opacity-50"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <motion.div
        className="relative py-8 flex items-center justify-center"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-4xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </div>
      </motion.div>
    );
  }

  // Default: simple gradient line
  return (
    <motion.div
      className="py-4"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </motion.div>
  );
};
