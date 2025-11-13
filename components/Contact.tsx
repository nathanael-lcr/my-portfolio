"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function Contact() {
  const contacts = [
    {
      label: "Latest Project",
      link: "https://www.brainbinder.net/",
      className: "row-span-2",
      position: "justify-start items-start",
    },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/nathana%C3%ABl-lecron/",
      className: "col-span-2",
      position: "justify-start items-end",
    },
    {
      label: "Github",
      link: "https://github.com/nathanael-lcr",
      position: "justify-end items-start",
    },
    {
      label: "eMail",
      link: "mailto:lecron.nathanael@gmail.com",
      position: "justify-end items-end",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative">
        {/* Texte géant en fond */}
        <div className="[font-family:var(--font-bokor)] dark:text-neutral-100 text-[300px] md:text-[300px] lg:text-[400px] leading-none font-bold text-black select-none">
          CONTACT
        </div>

        {/* Grille de cartes */}
        <div className="[font-family:var(--font-figtree)] inset-[-100px] absolute inset-0 grid grid-cols-3 grid-rows-2 gap-8">
          {contacts.map((contact, index) => (
            <TiltCard
              key={contact.label}
              href={contact.link}
              label={contact.label}
              delay={index * 0.1}
              className={contact.className}
              position={contact.position}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TiltCardProps {
  href: string;
  label: string;
  delay?: number;
  className?: string;
  position?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

function TiltCard({
  href,
  label,
  delay = 0,
  className = "",
  position = "",
  rotateAmplitude = 14,
  scaleOnHover = 1.07,
}: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Motion values pour rotation
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    // Rotation douce et proportionnelle
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("mailto:") ? "_blank" : "_self"}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 800,
      }}
      className={`
        ${className}
        backdrop-blur-md bg-neutral-600/5
        p-6 flex flex-col ${position}
        hover:bg-neutral-400/10
        border border-neutral-400/20
        transition-colors duration-300
        cursor-pointer group
        rounded-2xl
        will-change-transform
      `}
    >
      <div className="dark:text-neutral-100 text-2xl md:text-3xl font-semibold mb-2 text-black">
        {label}
      </div>
    </motion.a>
  );
}
