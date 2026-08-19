"use client";

import React, { useState } from "react";
import { ImageHeader } from "./ImageHeader";
import { ImageShowcase } from "./ImageShowcase";
import { ImagePromptBar } from "./ImagePromptBar";
import { ShowcaseImage } from "./ImageCard";
import { toast } from "sonner";
import {
  generateImage,
  type ImageGenerationOptions,
} from "@/services/imageGenerate.service";

export const Images = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectImage = (image: ShowcaseImage) => {
    setSelectedId(image.id);
    setPrompt(image.fullPrompt);
  };

  const handleGenerate = async (options: ImageGenerationOptions) => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    toast.info("Generando imagen con IA...", {
      description: prompt.slice(0, 60) + (prompt.length > 60 ? "..." : ""),
    });

    try {
      await generateImage(prompt, options);
      toast.success("Generación de imagen creada con éxito.");
    } catch (error) {
      toast.error("No se pudo generar la imagen.", {
        description:
          error instanceof Error ? error.message : "Inténtalo nuevamente.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center py-6 px-4 select-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full pt-2 sm:pt-4">
        <ImageHeader />
      </div>

      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-6">
        <ImageShowcase
          selectedId={selectedId}
          onSelectImage={handleSelectImage}
        />
      </div>

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