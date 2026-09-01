"use client";

import React from "react";
import { cn } from "@/lib/utils";

import imagenes from "@/assets/imagesss.webp";

export interface ShowcaseImage {
  id: string;
  title: string;
  fullPrompt: string;
  imageUrl: string;
  rotationClass?: string;
  zIndex?: number;
}

interface ImageCardProps {
  image: ShowcaseImage;
  isSelected?: boolean;
  onSelect?: (image: ShowcaseImage) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  isSelected,
  onSelect,
}) => {
  const fallbackSrc = (imagenes as any)?.src || (imagenes as unknown as string);

  return (
    <div
      onClick={() => onSelect?.(image)}
      className={cn(
        "relative w-36 sm:w-44 md:w-48 h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer shrink-0 select-none",
        "border border-white/10 shadow-2xl backdrop-blur-sm",
        "transition-all duration-300 ease-out hover:scale-108 hover:z-40 hover:-translate-y-2",
        image.rotationClass,
        isSelected && "ring-2 ring-blue-500 scale-105 z-30 shadow-blue-500/20"
      )}
    >
      <img
        src={image.imageUrl || fallbackSrc}
        alt={image.title || ""}
        className="w-full h-full object-contain p-2 pointer-events-none transition-transform duration-500 hover:scale-105"
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

      <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
        <p className="text-white text-xs sm:text-sm font-semibold truncate tracking-tight drop-shadow-md">
          {image.title}
        </p>
      </div>
    </div>
  );
};
