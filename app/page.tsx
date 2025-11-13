"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import SecondaryLine from "@/components/SecondaryLine";
import BentoGrid from "@/components/BentoGrid";
import SmoothFollower from "@/components/SmoothFollower";
import TechStackCarousel from "@/components/TechStackCarousel";
import Contact from "@/components/Contact";
import ParallaxShowcase from "@/components/ParallaxShowcase";

// Variants d'animation réutilisables
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="dark:bg-neutral-950">
      <SmoothFollower />
      <div className="overflow-hidden">
        {/* Hero Section */}
        <div className=" flex flex-col">
          <div className=" dark:text-neutral-100 flex items-end justify-between gap-8 mt-32 md:ml-14 flex-1">
            {/* Name - Animation from left */}
            <motion.div
              className="ml-5"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                className="[font-family:var(--font-bokor)] text-[80px] md:text-[300px] leading-none"
                variants={slideInLeft}
              >
                NATHANAEL
              </motion.div>
              <motion.div
                className="[font-family:var(--font-bokor)] text-[80px] md:text-[300px] leading-none"
                variants={slideInLeft}
              >
                LECRON
              </motion.div>
            </motion.div>

            {/* Description - Animation from right */}
            <motion.div
              className="absolute font-family:var(--font-figtree)] font-medium text-3xl text-right md:pb-11 whitespace-nowrap right-10"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={slideInRight}>
                <span className="font-bold">Full-Stack</span> developer
                interested in the design
              </motion.div>
              <motion.div variants={slideInRight}>
                and creation of immersive web experiences
              </motion.div>
              <motion.div variants={slideInRight}>since 2020</motion.div>
            </motion.div>
          </div>
        </div>

        {/* Secondary Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 1 }}
          animate={{
            opacity: 1,
            scaleX: 1,
            transition: { delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <SecondaryLine />
        </motion.div>

        {/* Projects Section */}
        <motion.div
          className="font-family:var(--font-figtree)] dark:text-neutral-100 mt-36 flex items-center justify-center text-3xl mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          PROJECTS.
        </motion.div>

        <ParallaxShowcase></ParallaxShowcase>

        {/* Tech Stack Section */}
        <motion.div
          className="dark:text-neutral-100 flex items-center justify-center text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          TECH STACK.
        </motion.div>


        <TechStackCarousel/>


        {/* Contact Section */}
        <motion.div
          className="dark:text-neutral-100 flex items-center justify-center text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          -
        </motion.div>

        <Contact/>

        {/* Footer */}
        <motion.div
          className="dark:text-neutral-100 mt-16 pb-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          @2025
        </motion.div>
      </div>
    </div>
  );
}
