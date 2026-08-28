"use client";

import React from "react";
import { Sparkles, Clapperboard, Lightbulb, PenTool, Film } from "lucide-react";

interface ChatEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
  selectedModel: string;
}

export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  onSelectPrompt,
  selectedModel,
}) => {
  const suggestions = [
    {
      title: "Guion Cinematográfico",
      description: "Escribe una escena de suspenso en un tren nocturno",
      icon: Clapperboard,
      prompt:
        "Escribe un guion cinematográfico breve para una escena de suspenso nocturna en un tren que viaja a gran velocidad.",
    },
    {
      title: "Desarrollo de Personajes",
      description: "Crea el perfil psicológico de un villano carismático",
      icon: PenTool,
      prompt:
        "Crea el perfil detallado de un antagonista complejo y carismático para una película de ciencia ficción distópica.",
    },
    {
      title: "Brainstorming de Concepto",
      description: "Genera 5 premisas originales de películas de misterio",
      icon: Lightbulb,
      prompt:
        "Genera 5 premisas de películas de misterio psicológico con giros de trama inesperados y alto impacto visual.",
    },
    {
      title: "Diálogo y Tono",
      description: "Optimiza un diálogo dramático para sonar más natural",
      icon: Film,
      prompt:
        "Ayúdame a escribir un diálogo intenso entre dos socios que descubren una traición en su productora de cine.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-4 text-center select-none py-8">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10">
        <Sparkles className="w-8 h-8 text-blue-400" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2">
        ¿En qué historia estás trabajando hoy?
      </h2>
      <p className="text-sm text-neutral-400 max-w-md mb-8">
        Potencia tu creatividad cinematográfica con IA. Modelo activo:{" "}
        <span className="text-blue-400 font-medium">{selectedModel}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        {suggestions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => onSelectPrompt(item.prompt)}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-blue-500/40 hover:bg-neutral-800/60 transition-all duration-200 group flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-neutral-800/80 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-950/40 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-200 group-hover:text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 line-clamp-2">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
