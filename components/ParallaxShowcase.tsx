import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";

interface Project {
  id: number;
  title: string;
  tags: string;
  image: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  scale: number;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const projects: Project[] = [
  {
    id: 1,
    title: "INTERIOR DESIGNER",
    tags: "[web design]",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop",
    position: { top: "15%", left: "8%" },
    scale: 1.4,
  },
  {
    id: 2,
    title: "VIBECODED",
    tags: "Low level programmaing & music theory",
    image: "/images/vibecoded.png",
    position: { top: "60%", left: "3%" },
    scale: 1.2,
  },
  {
    id: 3,
    title: "BRAINBINDER.",
    tags: "Web Design & Development",
    image: "/images/brainbinder_dark.png",
    position: { top: "10%", right: "5%" },
    scale: 1.5,
  },
  {
    id: 4,
    title: "ODYSSEY OUTRUN",
    tags: "Game engine work & Physics understanding",
    image: "/images/odyssey-outrun.jpg",
    position: { bottom: "8%", right: "12%" },
    scale: 1.35,
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  mouseX,
  mouseY,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // parallaxe selon index
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 100 : -100, index % 2 === 0 ? -100 : 100]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const floatIntensity = 20 + index * 5;

  // Ici on passe la MotionValue mouseX et mouseY ; useTransform retourne une MotionValue<number>
  const floatX = useTransform(
    mouseX,
    (latest) => (latest - 0.5) * floatIntensity
  );
  const floatY = useTransform(
    mouseY,
    (latest) => (latest - 0.5) * floatIntensity
  );

  const smoothFloatX = useSpring(floatX, { stiffness: 100, damping: 20 });
  const smoothFloatY = useSpring(floatY, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        x: smoothFloatX,
        opacity,
        scale,
        position: "absolute",
        ...project.position,
        width: `${350 * project.scale}px`,
      }}
      className="group [font-family:var(--font-figtree)]"
    >
      <motion.div
        style={{ y: smoothFloatY }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold mb-2 tracking-wider">
              {project.title}
            </h3>
            <p className="text-sm opacity-80">{project.tags}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // typage explicite MotionValue<number>
  const mouseX = useMotionValue<number>(0.5);
  const mouseY = useMotionValue<number>(0.5);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.5, 0.6],
    [0, 1, 1, 0]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <div ref={containerRef} className="relative">
        <div className="mt-58 fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <motion.h1
            style={{ opacity: titleOpacity }}
            className="[font-family:var(--font-bokor)] text-[15rem] font-bold tracking-tighter select-none"
          >
            PROJECTS
          </motion.h1>
        </div>

        <div className="sticky top-0 min-h-[130vh]">
          <div className="absolute inset-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
