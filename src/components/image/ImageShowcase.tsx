"use client";

import React from "react";
import { ImageCard, ShowcaseImage } from "./ImageCard";

export const defaultShowcaseImages: ShowcaseImage[] = [
  {
    id: "owl",
    title: "White Owl, Clos...",
    fullPrompt: "Close-up portrait of a majestic white snowy owl with piercing yellow eyes in a dark atmospheric studio setting, cinematic 8k detail.",
    imageUrl: "/images/owl.svg",
    rotationClass: "-rotate-3 translate-y-2 z-10",
  },
  {
    id: "taxi",
    title: "A Taxi Driver Pu...",
    fullPrompt: "Cinematic shot of a yellow vintage taxi driving through rain-slicked city streets at dusk, neo-noir lighting, reflections and neon bokeh.",
    imageUrl: "/images/taxi.svg",
    rotationClass: "-rotate-1 translate-y-1 z-10",
  },
  {
    id: "painting",
    title: "Oil Painting Of ...",
    fullPrompt: "Vibrant oil painting of blooming hibiscus and tropical flowers against a rich cobalt blue textured canvas background, expressive brushstrokes.",
    imageUrl: "/images/painting.svg",
    rotationClass: "rotate-3 -translate-y-2.5 z-20 shadow-blue-500/20",
  },
  {
    id: "cat",
    title: "A Highly Stylize...",
    fullPrompt: "A highly stylized cute cat explorer in a detective trenchcoat and bowler hat on a colourful pastel Victorian street with vintage trolley.",
    imageUrl: "/images/cat.svg",
    rotationClass: "rotate-2 translate-y-2 z-10",
  },
];

interface ImageShowcaseProps {
  images?: ShowcaseImage[];
  selectedId?: string | null;
  onSelectImage?: (image: ShowcaseImage) => void;
}

export const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  images = defaultShowcaseImages,
  selectedId,
  onSelectImage,
}) => {
  return (
    <div className="relative w-full flex items-center justify-center py-6 px-4">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Cards Deck */}
      <div className="relative flex items-center justify-center -space-x-3 sm:-space-x-5 md:-space-x-6 overflow-visible">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            isSelected={selectedId === image.id}
            onSelect={onSelectImage}
          />
        ))}
      </div>
    </div>
  );
};
