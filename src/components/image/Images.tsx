"use client";

import React, { useState } from "react";
import { ImageHeader } from "./ImageHeader";
import { ImageShowcase } from "./ImageShowcase";
import { ImagePromptBar } from "./ImagePromptBar";
import { ShowcaseImage } from "./ImageCard";
import { toast } from "sonner";

export const Images = () => {
  const [prompt, setPrompt] = useState(
    "A miniature raccoon explorer made of wool wearing all kinds of equipment, the whole world is made of felt textile"
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectImage = (image: ShowcaseImage) => {
    setSelectedId(image.id);
    setPrompt(image.fullPrompt);
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    toast.info("Generando imagen con IA...", {
      description: prompt.slice(0, 60) + (prompt.length > 60 ? "..." : ""),
    });

    setTimeout(() => {
      setIsGenerating(false);
      toast.success("¡Imagen generada con éxito!");
    }, 2000);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center py-6 px-4 select-none overflow-hidden">
      {/* Background Ambience / Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* 1. Header */}
      <div className="relative z-10 w-full pt-2 sm:pt-4">
        <ImageHeader />
      </div>

      {/* 2. Center Showcase Cards Deck */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-6">
        <ImageShowcase
          selectedId={selectedId}
          onSelectImage={handleSelectImage}
        />
      </div>

      {/* 3. Bottom Prompt Floating Control Bar */}
      <div className="relative z-20 w-full pb-4 sm:pb-8">
        <ImagePromptBar
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};

export default Images;
