"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { items } from "./constant/constant";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Carousel() {
  const [width, setWidth] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  // --- Responsive width & centering ---
  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        const scrollWidth = carousel.current.scrollWidth;
        const offsetWidth = carousel.current.offsetWidth;
        const totalOverflow = scrollWidth - offsetWidth;

        setWidth(totalOverflow);
        setStartOffset(-totalOverflow / 2);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24">

      {/* Left Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 sm:w-16 md:w-20 bg-linear-to-r from-white dark:from-neutral-950 to-transparent z-10 flex items-center justify-center">
        <ArrowLeft className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Right Gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 sm:w-16 md:w-20 bg-linear-to-l from-white dark:from-neutral-950 to-transparent z-10 flex items-center justify-center">
        <ArrowRight className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Carousel */}
      <motion.div
        ref={carousel}
        drag="x"
        initial={{ x: startOffset }}
        animate={{ x: startOffset }}
        whileDrag={{ scale: 0.96 }}
        dragElastic={0.25}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex gap-3 sm:gap-4 md:gap-6 cursor-grab active:cursor-grabbing px-4 sm:px-6 md:px-8 will-change-transform"
      >
        {items.map((itemData: { id: React.Key; url: string | StaticImport; title: string; }) => (
          <motion.div
            key={itemData.id}
            className="shrink-0 w-[140px] sm:w-[180px] md:w-[220px] flex items-center justify-center"
          >
            <Image
              src={itemData.url}
              width={200}
              height={200}
              alt={itemData.title}
              className="w-auto h-12 sm:h-16 md:h-28 object-contain grayscale opacity-80 hover:opacity-100 transition-all duration-300 pointer-events-none"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
