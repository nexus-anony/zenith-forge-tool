import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Interactive3DShape } from "@/components/animations/Interactive3DShape";

interface TechItem {
  name: string;
  category: string;
  x: number;
  y: number;
  color: string;
  icon: string;
}

const categoryColors = {
  languages: "#8b5cf6", // Purple
  frameworks: "#06b6d4", // Cyan
  tools: "#10b981", // Emerald
  platforms: "#f59e0b", // Amber
  devops: "#ef4444", // Red
};

const allTechnologies: TechItem[] = [
  // Languages
  { name: "Python", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "🐍" },
  { name: "JavaScript", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "🟨" },
  { name: "TypeScript", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "🔷" },
  { name: "C++", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "⚡" },
  { name: "Java", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "☕" },
  { name: "PHP", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "🐘" },
  { name: "SQL", category: "languages", x: 0, y: 0, color: categoryColors.languages, icon: "🗃️" },

  // Frameworks
  { name: "React.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, icon: "⚛️" },
  { name: "Next.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, icon: "▲" },
  { name: "Django", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, icon: "🎸" },
  { name: "Node.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, icon: "🟢" },
  { name: "Express.js", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, icon: "🚂" },
  { name: "Redux", category: "frameworks", x: 0, y: 0, color: categoryColors.frameworks, icon: "🔄" },

  // Tools
  { name: "Docker", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🐳" },
  { name: "Git", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🌿" },
  { name: "JWT", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🔐" },
  { name: "Web3.js", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🌐" },
  { name: "MySQL", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🐬" },
  { name: "MongoDB", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🍃" },
  { name: "Supabase", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "⚡" },
  { name: "Redis", category: "tools", x: 0, y: 0, color: categoryColors.tools, icon: "🔴" },

  // Platforms
  { name: "AWS", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, icon: "☁️" },
  { name: "GCP", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, icon: "🌤️" },
  { name: "Linux", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, icon: "🐧" },
  { name: "Windows", category: "platforms", x: 0, y: 0, color: categoryColors.platforms, icon: "🪟" },

  // DevOps
  { name: "Terraform", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🏗️" },
  { name: "Jenkins", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🔧" },
  { name: "Kubernetes", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "⚙️" },
  { name: "Grafana", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "📊" },
  { name: "SonarQube", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🔍" },
  { name: "Prometheus", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "📈" },
  { name: "Ansible", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🔀" },
  { name: "GitLab CI/CD", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🦊" },
  { name: "Nginx", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🌐" },
  { name: "Apache", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🪶" },
  { name: "Helm", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "⚓" },
  { name: "ArgoCD", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🚀" },
  { name: "Vault", category: "devops", x: 0, y: 0, color: categoryColors.devops, icon: "🔒" },
];

export const TechnologiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [technologies, setTechnologies] = useState<TechItem[]>([]);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Initialize positions
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializePositions = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const positionedTechs = allTechnologies.map((tech, index) => {
        const angle = index * 137.5 * (Math.PI / 180);
        const radius = 50 + index * 15 + Math.random() * 50;

        const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
        const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100;

        return {
          ...tech,
          x: Math.max(60, Math.min(rect.width - 60, x)),
          y: Math.max(60, Math.min(rect.height - 60, y)),
        };
      });

      setTechnologies(positionedTechs);
    };

    initializePositions();
    window.addEventListener("resize", initializePositions);
    return () => window.removeEventListener("resize", initializePositions);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Magnetic effect
  const getMagneticOffset = (techX: number, techY: number) => {
    const distance = Math.sqrt(Math.pow(mousePosition.x - techX, 2) + Math.pow(mousePosition.y - techY, 2));

    if (distance > 150) return { x: 0, y: 0 };

    const force = Math.max(0, 1 - distance / 150);
    const angle = Math.atan2(mousePosition.y - techY, mousePosition.x - techX);

    return {
      x: Math.cos(angle) * force * 30,
      y: Math.sin(angle) * force * 30,
    };
  };

  // Get connections between related technologies
  const getConnections = () => {
    const connections: Array<{ from: TechItem; to: TechItem; strength: number }> = [];

    technologies.forEach((tech1, i) => {
      technologies.forEach((tech2, j) => {
        if (i >= j) return;

        const distance = Math.sqrt(Math.pow(tech1.x - tech2.x, 2) + Math.pow(tech1.y - tech2.y, 2));

        const sameCategory = tech1.category === tech2.category;
        const closeDistance = distance < 120;

        if (sameCategory || closeDistance) {
          const strength = sameCategory ? 0.6 : Math.max(0, 1 - distance / 120) * 0.3;
          if (strength > 0.1) {
            connections.push({ from: tech1, to: tech2, strength });
          }
        }
      });
    });

    return connections;
  };

  const connections = getConnections();

  return (
    <section id="technologies" className="py-20 sm:py-32 relative overflow-hidden">
      <Interactive3DShape type="octahedron" color="#22d3ee" size={90} position={{ x: -80, y: 30, z: -100 }} />
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-center">
            Technologies & <span className="gradient-text">Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-center mb-12">
            An interactive constellation of technologies I work with. Hover to explore the connections.
          </p>

          {/* Category Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(categoryColors).map(([category, color]) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category ? "text-white shadow-lg" : "text-muted-foreground hover:text-white"
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? color : "rgba(255,255,255,0.1)",
                  border: `2px solid ${color}`,
                }}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Technologies Constellation */}
          <div
            ref={containerRef}
            className="relative w-full h-[600px] md:h-[700px] glass rounded-3xl overflow-hidden border-2 border-primary/20"
          >
            {/* Background particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    y: Math.random() * 600,
                  }}
                  animate={{
                    x: [
                      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                      Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                    ],
                    y: [Math.random() * 600, Math.random() * 600],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((connection, index) => {
                const fromOffset = getMagneticOffset(connection.from.x, connection.from.y);
                const toOffset = getMagneticOffset(connection.to.x, connection.to.y);

                const isHighlighted =
                  hoveredTech === connection.from.name ||
                  hoveredTech === connection.to.name ||
                  (selectedCategory &&
                    (connection.from.category === selectedCategory || connection.to.category === selectedCategory));

                return (
                  <motion.line
                    key={index}
                    x1={connection.from.x + fromOffset.x}
                    y1={connection.from.y + fromOffset.y}
                    x2={connection.to.x + toOffset.x}
                    y2={connection.to.y + toOffset.y}
                    stroke={isHighlighted ? connection.from.color : "rgba(255,255,255,0.1)"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    opacity={connection.strength * (isHighlighted ? 1 : 0.5)}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Technology nodes */}
            {technologies.map((tech) => {
              const magneticOffset = getMagneticOffset(tech.x, tech.y);
              const isHighlighted = hoveredTech === tech.name || (selectedCategory && tech.category === selectedCategory);
              const isFiltered = selectedCategory && tech.category !== selectedCategory;

              return (
                <motion.div
                  key={tech.name}
                  className="absolute cursor-pointer"
                  initial={{
                    x: tech.x,
                    y: tech.y,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: tech.x + magneticOffset.x,
                    y: tech.y + magneticOffset.y,
                    opacity: isFiltered ? 0.3 : 1,
                    scale: isHighlighted ? 1.2 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.2 },
                  }}
                  style={{ translateX: "-50%", translateY: "-50%" }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  whileHover={{ scale: 1.3 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ backgroundColor: tech.color }}
                    animate={{
                      opacity: isHighlighted ? 0.6 : 0.2,
                      scale: isHighlighted ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Main node */}
                  <motion.div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-2xl border-2"
                    style={{
                      backgroundColor: `${tech.color}20`,
                      borderColor: tech.color,
                      boxShadow: `0 0 20px ${tech.color}40`,
                    }}
                    animate={{
                      boxShadow: isHighlighted ? `0 0 30px ${tech.color}80` : `0 0 20px ${tech.color}40`,
                    }}
                  >
                    <span className="text-xl">{tech.icon}</span>

                    {/* Ripple effect */}
                    {isHighlighted && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: tech.color }}
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium border"
                    style={{ borderColor: tech.color }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: isHighlighted ? 1 : 0,
                      y: isHighlighted ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech.name}
                  </motion.div>

                  {/* Orbital rings for highlighted items */}
                  {isHighlighted && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border border-white/20"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ scale: 1.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border border-white/10"
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ scale: 2 }}
                      />
                    </>
                  )}
                </motion.div>
              );
            })}

            {/* Mouse follower effect */}
            <motion.div
              className="absolute w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{
                scale: hoveredTech ? 1.5 : 1,
                opacity: hoveredTech ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Category info panel */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-xl p-4 border"
                style={{ borderColor: categoryColors[selectedCategory as keyof typeof categoryColors] }}
              >
                <h4 className="text-lg font-bold mb-2">
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </h4>
                <div className="space-y-1">
                  {technologies
                    .filter((tech) => tech.category === selectedCategory)
                    .map((tech) => (
                      <div key={tech.name} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {Object.entries(categoryColors).map(([category, color]) => {
              const count = technologies.filter((tech) => tech.category === category).length;
              return (
                <motion.div
                  key={category}
                  className="text-center p-4 rounded-xl glass border border-primary/20"
                  whileHover={{ scale: 1.05, borderColor: color }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">{category}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
