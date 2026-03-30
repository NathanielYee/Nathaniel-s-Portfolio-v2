import { motion } from "framer-motion";

const orbs = [
  {
    id: 1,
    size: 550,
    color:
      "radial-gradient(circle, rgba(29,78,216,0.45) 0%, rgba(10,22,40,0) 70%)",
    blur: 130,
    opacity: 0.3,
    x: ["10%", "25%", "15%", "30%", "10%"],
    y: ["5%", "20%", "35%", "15%", "5%"],
    duration: 22,
  },
  {
    id: 2,
    size: 450,
    color:
      "radial-gradient(circle, rgba(67,56,202,0.5) 0%, rgba(49,46,129,0.2) 40%, rgba(10,22,40,0) 70%)",
    blur: 150,
    opacity: 0.25,
    x: ["70%", "55%", "65%", "50%", "70%"],
    y: ["60%", "40%", "55%", "70%", "60%"],
    duration: 18,
  },
  {
    id: 3,
    size: 600,
    color:
      "radial-gradient(circle, rgba(14,116,144,0.4) 0%, rgba(29,78,216,0.15) 45%, rgba(10,22,40,0) 70%)",
    blur: 140,
    opacity: 0.2,
    x: ["40%", "55%", "35%", "50%", "40%"],
    y: ["15%", "30%", "45%", "25%", "15%"],
    duration: 25,
  },
  {
    id: 4,
    size: 350,
    color:
      "radial-gradient(circle, rgba(49,46,129,0.5) 0%, rgba(67,56,202,0.2) 40%, rgba(10,22,40,0) 70%)",
    blur: 110,
    opacity: 0.15,
    x: ["80%", "65%", "75%", "85%", "80%"],
    y: ["10%", "25%", "15%", "5%", "10%"],
    duration: 20,
  },
];

export const NebulaBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle top-to-bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, rgba(15,30,55,0.3) 50%, rgba(10,22,40,0.15) 100%)",
        }}
      />

      {/* Container that dims in light mode */}
      <div className="absolute inset-0 opacity-40 dark:opacity-100 transition-opacity duration-500">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            animate={{
              x: orb.x,
              y: orb.y,
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              width: orb.size,
              height: orb.size,
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              opacity: orb.opacity,
              willChange: "transform",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
