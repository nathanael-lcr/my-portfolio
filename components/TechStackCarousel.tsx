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

  useEffect(() => {
    if (carousel.current) {
      const scrollWidth = carousel.current.scrollWidth;
      const offsetWidth = carousel.current.offsetWidth;
      const totalOverflow = scrollWidth - offsetWidth;

      setWidth(totalOverflow);
      setStartOffset(-totalOverflow / 2); // 👈 démarre au centre
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-24">
      {/* Dégradés gauche/droite */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 flex items-center justify-center">
        <ArrowLeft className="text-gray-400 w-5 h-5" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 flex items-center justify-center">
        <ArrowRight className="text-gray-400 w-5 h-5" />
      </div>

      {/* Carrousel */}
      <motion.div
        ref={carousel}
        drag="x"
        initial={{ x: startOffset }} // 👈 commence centré
        animate={{ x: startOffset }} // 👈 animation fluide au chargement
        whileDrag={{ scale: 0.96 }}
        dragElastic={0.25}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex md:gap-6 cursor-grab active:cursor-grabbing md:px-8 will-change-transform"
      >
        {items.map(
          (itemData: {
            id: React.Key | null | undefined;
            url: string | StaticImport;
            title: string;
          }) => (
            <motion.div
              key={itemData.id}
              className="shrink-0 w-[250px] flex items-center justify-center"
            >
              <Image
                src={itemData.url}
                width={200}
                height={200}
                alt={itemData.title}
                className="w-auto md:h-28 h-12 object-contain grayscale opacity-80 hover:opacity-100 transition-all duration-300 pointer-events-none"
              />
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
}
