"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Image as ImageIcon,
  Settings,
  Smartphone,
  Sparkles,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatioPopover } from "./AspectRatioPopover";
import { SettingsPopover } from "./SettingsPopover";
import {
  getImageDimensions,
  IMAGE_MODELS,
  IMAGE_SAMPLERS,
  type ImageAspectRatio,
  type ImageGenerationOptions,
  type ImageQuality,
} from "@/services/imageGenerate.service";

interface ImagePromptBarProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate?: (options: ImageGenerationOptions) => void;
  isGenerating?: boolean;
}

export const ImagePromptBar: React.FC<ImagePromptBarProps> = ({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating = false,
}) => {
  const [model, setModel] = useState<string>(IMAGE_MODELS[0].value);
  const [quality, setQuality] = useState<ImageQuality>("standard");
  const [negativePrompt, setNegativePrompt] = useState(
    "blurry, low quality, distorted, ugly, oversaturated"
  );
  const [styleId, setStyleId] = useState(1);
  const [seed, setSeed] = useState(12345);
  const [steps, setSteps] = useState(30);
  const [cfgScale, setCfgScale] = useState(7.5);
  const [sampler, setSampler] = useState<string>(IMAGE_SAMPLERS[0].value);
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>("2:3");
  const [isAuto, setIsAuto] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showRatioPopover, setShowRatioPopover] = useState(false);
  const ratioTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleRatioMouseEnter = () => {
    if (ratioTimeoutRef.current) clearTimeout(ratioTimeoutRef.current);
    setShowRatioPopover(true);
  };

  const handleRatioMouseLeave = () => {
    ratioTimeoutRef.current = setTimeout(() => setShowRatioPopover(false), 200);
  };

  const handleGenerate = () => {
    const { width, height } = getImageDimensions(aspectRatio);
    onGenerate?.({
      negativePrompt: negativePrompt.trim(),
      styleId,
      aspectRatio,
      quality,
      width,
      height,
      parameters: { seed, steps, cfgScale, sampler, model },
    });
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4">
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-indigo-500/8 to-violet-600/10 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl bg-[#0f1117]/85 border border-white/[0.09] backdrop-blur-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)] p-3.5 sm:p-4 space-y-3 transition-all duration-300 hover:border-white/[0.13]">
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="A miniature raccoon explorer made of wool wearing all kinds of equipment, the whole world is made of felt textile"
          rows={2}
          className="w-full bg-transparent text-slate-100 placeholder-zinc-600 text-xs sm:text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed font-normal selection:bg-indigo-500/30"
        />

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSettings((c) => !c)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg border transition-all duration-200",
                  showSettings
                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                    : "bg-white/[0.04] text-zinc-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-zinc-200 hover:border-white/[0.15]"
                )}
                title="Ajustes de generación"
                aria-label="Ajustes de generación"
              >
                <Settings className="h-3.5 w-3.5" />
              </button>

              {showSettings && (
                <SettingsPopover
                  model={model}               onModelChange={setModel}
                  quality={quality}           onQualityChange={setQuality}
                  sampler={sampler}           onSamplerChange={setSampler}
                  negativePrompt={negativePrompt} onNegativePromptChange={setNegativePrompt}
                  styleId={styleId}           onStyleIdChange={setStyleId}
                  seed={seed}                 onSeedChange={setSeed}
                  steps={steps}               onStepsChange={setSteps}
                  cfgScale={cfgScale}         onCfgScaleChange={setCfgScale}
                  onClose={() => setShowSettings(false)}
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsAuto(!isAuto)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 border",
                isAuto
                  ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-[0_0_8px_rgba(99,102,241,0.2)]"
                  : "bg-white/[0.03] text-zinc-500 border-white/[0.07] hover:text-zinc-300 hover:border-white/[0.12]"
              )}
            >
              <Wand2 className={cn("w-3 h-3 transition-colors", isAuto ? "text-indigo-400" : "text-zinc-600")} />
              <span>Auto</span>
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.07]">
              <ImageIcon className="w-3 h-3 text-sky-400" />
              <span>Image</span>
            </div>

            <div
              className="relative"
              onMouseEnter={handleRatioMouseEnter}
              onMouseLeave={handleRatioMouseLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (ratioTimeoutRef.current) clearTimeout(ratioTimeoutRef.current);
                  setShowRatioPopover((c) => !c);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 border cursor-pointer",
                  showRatioPopover
                    ? "bg-white/[0.08] text-white border-white/[0.18] shadow-sm"
                    : "bg-white/[0.04] text-zinc-300 border-white/[0.07] hover:bg-white/[0.07] hover:text-white hover:border-white/[0.14]"
                )}
                title="Cambiar relación de aspecto"
              >
                <Smartphone className="w-3 h-3 text-zinc-400" />
                <span>{aspectRatio}</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 text-zinc-500 transition-transform duration-200",
                    showRatioPopover && "rotate-180"
                  )}
                />
              </button>

              {showRatioPopover && (
                <AspectRatioPopover
                  currentRatio={aspectRatio}
                  onSelectRatio={(ratio) => {
                    if (ratioTimeoutRef.current) clearTimeout(ratioTimeoutRef.current);
                    setAspectRatio(ratio as ImageAspectRatio);
                    setShowRatioPopover(false);
                  }}
                />
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className={cn(
              "relative flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg",
              "bg-white text-zinc-950 hover:bg-zinc-100 active:scale-95",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white",
              !isGenerating && prompt.trim() && "hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            )}
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
  );
};