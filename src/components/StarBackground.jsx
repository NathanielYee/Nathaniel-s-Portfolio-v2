import { useEffect, useState, useCallback } from "react";

export const StarBackground = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [particles, setParticles] = useState([]);
  const [shooters, setShooters] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const vh = window.innerHeight;
    // 0 at top, 1 at one viewport height scrolled
    setScrollProgress(Math.min(1, window.scrollY / (vh * 0.6)));
  }, []);

  useEffect(() => {
    generateAsteroids();
    generateParticles();
    generateShooters();

    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      generateAsteroids();
      generateParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const generateAsteroids = () => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    const newAsteroids = [];

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 2;
      newAsteroids.push({
        id: i,
        size,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.2,
        driftDuration: Math.random() * 30 + 20,
        driftX: (Math.random() - 0.5) * 40,
        driftY: (Math.random() - 0.5) * 20,
        pulseDuration: Math.random() * 4 + 3,
        glowSize: size * (1.5 + Math.random()),
        hue: 200 + Math.random() * 30,
      });
    }

    setAsteroids(newAsteroids);
  };

  const generateParticles = () => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 40000);
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        startY: 50 + Math.random() * 50,
        riseDuration: Math.random() * 20 + 15,
        swayDuration: Math.random() * 8 + 4,
        opacity: Math.random() * 0.25 + 0.05,
        delay: Math.random() * -20,
      });
    }

    setParticles(newParticles);
  };

  const generateShooters = () => {
    const count = 8;
    const newShooters = [];

    // Fixed travel direction: 40 degrees from vertical (upper-left to lower-right)
    const travelAngle = 40 * (Math.PI / 180);
    const travelDist = 140; // % of viewport diagonal
    const dirX = Math.sin(travelAngle); // horizontal component
    const dirY = Math.cos(travelAngle); // vertical component

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 4 + 3;
      // Stagger starts along upper-left edge
      const offset = Math.random() * 60 - 20;
      const startX = -10 + offset * 0.5;
      const startY = -10 - offset * 0.3;
      const endX = startX + dirX * travelDist;
      const endY = startY + dirY * travelDist;
      newShooters.push({
        id: i,
        size,
        startX,
        startY,
        endX,
        endY,
        duration: Math.random() * 6 + 8,
        totalDelay: Math.random() * 18 + i * 6,
        opacity: Math.random() * 0.4 + 0.45,
        hue: 205 + Math.random() * 15,
        trailLength: size * 16 + Math.random() * 20,
      });
    }

    setShooters(newShooters);
  };

  // Shooters visible after scrolling, eased in
  const shooterOpacity = Math.max(0, (scrollProgress - 0.3) / 0.7);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Asteroids — circular glowing orbs */}
      {asteroids.map((a) => (
        <div
          key={`asteroid-${a.id}`}
          style={{
            position: "absolute",
            left: a.x + "%",
            top: a.y + "%",
            width: a.size + "px",
            height: a.size + "px",
            borderRadius: "50%",
            background: `radial-gradient(circle, hsla(${a.hue}, 70%, 80%, ${a.opacity}) 0%, hsla(${a.hue}, 60%, 60%, ${a.opacity * 0.5}) 40%, transparent 70%)`,
            boxShadow: `0 0 ${a.glowSize}px ${a.glowSize * 0.5}px hsla(${a.hue}, 70%, 70%, ${a.opacity * 0.3})`,
            animation: `asteroid-drift-${a.id} ${a.driftDuration}s ease-in-out infinite, asteroid-pulse ${a.pulseDuration}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Rising particles — lower sections */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          style={{
            position: "absolute",
            left: p.x + "%",
            bottom: (100 - p.startY) + "%",
            width: p.size + "px",
            height: p.size + "px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(96, 165, 250, ${p.opacity}) 0%, transparent 70%)`,
            animation: `particle-rise ${p.riseDuration}s ease-in-out infinite ${p.delay}s, particle-sway ${p.swayDuration}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Shooting asteroids — only visible after scrolling down */}
      <div
        style={{
          opacity: shooterOpacity,
          transition: "opacity 0.5s ease-out",
        }}
      >
        {shooters.map((s) => {
          // Calculate the exact angle of travel for the trail
          const dx = s.endX - s.startX;
          const dy = s.endY - s.startY;
          const trailAngle = Math.atan2(dy, dx) * (180 / Math.PI) - 90; // perpendicular to travel = trail behind
          return (
            <div
              key={`shooter-${s.id}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                animation: shooterOpacity > 0
                  ? `shooter-rain-${s.id} ${s.duration}s linear ${s.totalDelay}s infinite`
                  : "none",
              }}
            >
              {/* Trail — rotated to align behind the direction of travel */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -100%) rotate(${trailAngle}deg)`,
                  transformOrigin: "bottom center",
                  width: s.size * 0.8 + "px",
                  height: s.trailLength + "px",
                  background: `linear-gradient(to bottom, transparent 0%, hsla(${s.hue}, 75%, 70%, ${s.opacity * 0.4}) 50%, hsla(${s.hue}, 80%, 80%, ${s.opacity * 0.7}) 100%)`,
                  borderRadius: s.size + "px",
                  filter: `blur(${s.size * 0.3}px)`,
                }}
              />
              {/* Star orb */}
              <div
                style={{
                  width: s.size + "px",
                  height: s.size + "px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, hsla(${s.hue}, 80%, 90%, ${s.opacity}) 0%, hsla(${s.hue}, 85%, 70%, ${s.opacity * 0.7}) 40%, hsla(${s.hue}, 80%, 55%, ${s.opacity * 0.3}) 65%, transparent 80%)`,
                  boxShadow: `0 0 ${s.size * 3}px ${s.size * 1.5}px hsla(${s.hue}, 80%, 75%, ${s.opacity * 0.5}), 0 0 ${s.size * 6}px ${s.size * 2}px hsla(${s.hue}, 75%, 60%, ${s.opacity * 0.25})`,
                }}
              />
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes asteroid-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }

        @keyframes particle-rise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120px); opacity: 0; }
        }

        @keyframes particle-sway {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 15px; }
        }

        ${asteroids.map((a) => `
          @keyframes asteroid-drift-${a.id} {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${a.driftX * 0.4}px, ${a.driftY * 0.6}px); }
            50% { transform: translate(${a.driftX}px, ${a.driftY}px); }
            75% { transform: translate(${a.driftX * 0.6}px, ${a.driftY * 0.3}px); }
          }
        `).join("")}

        ${shooters.map((s) => `
          @keyframes shooter-rain-${s.id} {
            0% {
              transform: translate(${s.startX}vw, ${s.startY}vh);
              opacity: 0;
            }
            5% {
              opacity: ${s.opacity};
            }
            50% {
              opacity: ${s.opacity * 0.8};
            }
            75% {
              opacity: ${s.opacity * 0.4};
            }
            90% {
              opacity: ${s.opacity * 0.15};
            }
            100% {
              transform: translate(${s.endX}vw, ${s.endY}vh);
              opacity: 0;
            }
          }
        `).join("")}
      `}</style>
    </div>
  );
};
