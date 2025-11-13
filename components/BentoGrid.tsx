import React from 'react';
import { motion } from "motion/react"

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  title: string;
  description: string;
  delay?: number; // Ajout du delay
}

const Card = ({ className = "", children, title, description, delay = 0 }: CardProps) => {
  return (
    <motion.div
      className={`bg-neutral-300/40 relative overflow-hidden group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }} // Utilisation du delay
    >
      {children}
     
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
};

export default function BentoGrid() {
  return (
    <div className="font-family:var(--font-figtree)] min-h-screen p-8 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Large card - left */}
          <Card className="md:col-span-2 h-96" title='BrainBinder.' description='coucou' delay={0}>
            <div className="h-full flex items-center justify-center text-gray-400">
              Project 1
            </div>
          </Card>
         
          {/* Medium card - right */}
          <Card className="md:col-span-1 h-96" title='VibeCoded' description='coucou' delay={0.15}>
            <div className="h-full flex items-center justify-center text-gray-400">
              Project 2
            </div>
          </Card>
        </div>
       
        {/* Full width card - bottom */}
        <Card className="h-96" title='Odyssey Outrun' description='coucou' delay={0.3}>
          <div className="h-full flex items-center justify-center text-gray-400">
            Project 3
          </div>
        </Card>
      </div>
    </div>
  );
}