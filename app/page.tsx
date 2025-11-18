"use client";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import SecondaryLine from "@/components/SecondaryLine";
import BentoGrid from "@/components/BentoGrid";
import SmoothFollower from "@/components/SmoothFollower";
import TechStackCarousel from "@/components/TechStackCarousel";
import Contact from "@/components/Contact";
import ParallaxShowcase from "@/components/ParallaxShowcase";

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setReady(true), 200); // avoid "double RAF"
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: any) => {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    };
    window.requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="dark:bg-neutral-950">
      <SmoothFollower />
      <div className="overflow-hidden">
        {/* Hero Section */}
        <div className="flex flex-col">
          <div
            className="
      dark:text-neutral-100
      flex
      flex-col
      items-start
      gap-6
      mt-20
      px-5
      relative

      md:flex-row
      md:items-end
      md:justify-between
      md:gap-8
      md:mt-24
      md:ml-14
    "
          >
            {/* LEFT — NAME */}
            <motion.div
              className="will-change-transform"
              initial="hidden"
              animate={ready ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div
                className="[font-family:var(--font-bokor)] text-[clamp(4rem,23vw,7rem)] sm:text-[clamp(3rem,16vw,22rem)] leading-none"
                variants={slideInLeft}
              >
                NATHANAEL
              </motion.div>

              <motion.div
                className="[font-family:var(--font-bokor)] text-[clamp(4rem,23vw,7rem)] sm:text-[clamp(3rem,16vw,22rem)] leading-none"
                variants={slideInLeft}
              >
                LECRON
              </motion.div>
            </motion.div>

            {/* RIGHT — DESCRIPTION */}
            <motion.div
              className="
              [clamp(.3rem,5vw,2rem)]
              sm:text-[clamp(1rem,2vw,3rem)]
              font-medium 
              [font-family:var(--font-figtree)]
              text-left 
              space-y-1
              sm:mr-12

              md:absolute
              md:right-10
              md:text-right
              md:pb-11
              "
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={slideInRight}>
                <span className="font-bold">Full-Stack</span> developer
                interested
              </motion.div>
              <motion.div variants={slideInRight}>
                in the design & creation of immersive
              </motion.div>
              <motion.div variants={slideInRight}>
                web experiences since 2020
              </motion.div>
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
          className="[font-family:var(--font-figtree)] dark:text-neutral-100 mt-36 flex items-center justify-center text-3xl mb-12"
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
          className="[font-family:var(--font-figtree)] dark:text-neutral-100 flex items-center justify-center text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          TECH STACK.
        </motion.div>

        <TechStackCarousel />

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

        <Contact />

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
