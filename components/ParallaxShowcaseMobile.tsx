import { motion } from "framer-motion";

export function ProjectMobileCard({ project }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl p-4 shadow-lg border border-white/10"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="[font-family:var(--font-figtree)] mt-4 dark:text-neutral-100 text-black">
        <h3 className="text-xl font-bold mb-1 tracking-wide">
          {project.title}
        </h3>
        <p className="opacity-80 text-sm">{project.tags}</p>
      </div>
    </motion.div>
  );
}
