"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Image as ImageIcon,
  Smartphone,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatioPopover } from "./AspectRatioPopover";

interface ImagePromptBarProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

export const ImagePromptBar: React.FC<ImagePromptBarProps> = ({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating = false,
}) => {
  const [aspectRatio, setAspectRatio] = useState("2:3");
  const [isAuto, setIsAuto] = useState(true);
  const [styleMode, setStyleMode] = useState("Moodboard");
  const [showRatioPopover, setShowRatioPopover] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowRatioPopover(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowRatioPopover(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4">
      {/* Glow highlight underneath */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-violet-600/10 rounded-3xl blur-xl pointer-events-none" />

      {/* Main Bar Card */}
      <div className="relative rounded-2xl bg-[#14161f]/90 border border-white/10 backdrop-blur-xl shadow-2xl p-3.5 sm:p-4 space-y-3">
        {/* Prompt Input */}
        <div className="w-full">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="Describe la imagen que deseas generar..."
            rows={2}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-xs sm:text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed font-normal"
          />
        </div>

        {/* Footer Row / Controls */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
          {/* Left Chips / Settings */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {/* Auto Mode */}
            <button
              type="button"
              onClick={() => setIsAuto(!isAuto)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border",
                isAuto
                  ? "bg-zinc-800/90 text-zinc-200 border-zinc-700/80 shadow-sm"
                  : "bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300"
              )}
            >
              <Wand2 className="w-3 h-3 text-indigo-400" />
              <span>Auto</span>
            </button>

            {/* Mode: Image */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-800/90 text-zinc-200 border border-zinc-700/80">
              <ImageIcon className="w-3 h-3 text-blue-400" />
              <span>Image</span>
            </div>

            {/* Aspect Ratio with Hover Popover */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setShowRatioPopover((prev) => !prev);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border cursor-pointer",
                  showRatioPopover
                    ? "bg-zinc-700 text-white border-zinc-500 shadow-md"
                    : "bg-zinc-800/90 text-zinc-200 border-zinc-700/80 hover:bg-zinc-750"
                )}
                title="Cambiar relación de aspecto"
              >
                <Smartphone className="w-3 h-3 text-zinc-400" />
                <span>{aspectRatio}</span>
              </button>

              {/* Popover */}
              {showRatioPopover && (
                <AspectRatioPopover
                  currentRatio={aspectRatio}
                  onSelectRatio={(ratio) => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setAspectRatio(ratio);
                    setShowRatioPopover(false);
                  }}
                />
              )}
            </div>

            {/* Moodboard / Style Preset */}
            <button
              type="button"
              onClick={() =>
                setStyleMode((prev) =>
                  prev === "Moodboard" ? "Cinematic" : prev === "Cinematic" ? "Photorealistic" : "Moodboard"
                )
              }
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-800/90 text-zinc-200 border border-zinc-700/80 hover:bg-zinc-750 transition-colors"
            >
              <span>{styleMode}</span>
            </button>
          </div>

          {/* Right Action Button with Tooltip */}
          <div className="relative flex items-center shrink-0">
            {/* "Click to generate" Tooltip */}
            <div className="absolute -top-8 right-0 -translate-x-1 pointer-events-none z-30">
              <div className="relative bg-white text-zinc-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-pulse flex items-center gap-1">
                <span>Click to generate</span>
                {/* Arrow down */}
                <div className="absolute -bottom-1 right-3 w-2 h-2 bg-white rotate-45" />
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transition-all"
              title="Generar imagen"
            >
              {isGenerating ? (
                <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 fill-zinc-950 text-zinc-950" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
