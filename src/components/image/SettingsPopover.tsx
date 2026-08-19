"use client";

import React from "react";
import { Settings, X } from "lucide-react";
import {
  IMAGE_MODELS,
  IMAGE_SAMPLERS,
  type ImageQuality,
} from "@/services/imageGenerate.service";
import { CustomSelect } from "./ui/CustomSelect";
import { FieldLabel, inputCls } from "./ui/FieldLabel";

interface SettingsPopoverProps {
  model: string;
  onModelChange: (v: string) => void;
  quality: ImageQuality;
  onQualityChange: (v: ImageQuality) => void;
  sampler: string;
  onSamplerChange: (v: string) => void;
  negativePrompt: string;
  onNegativePromptChange: (v: string) => void;
  styleId: number;
  onStyleIdChange: (v: number) => void;
  seed: number;
  onSeedChange: (v: number) => void;
  steps: number;
  onStepsChange: (v: number) => void;
  cfgScale: number;
  onCfgScaleChange: (v: number) => void;
  onClose: () => void;
}

const QUALITY_OPTIONS = [
  { value: "standard", label: "Estándar" },
  { value: "hd", label: "HD" },
  { value: "4k", label: "4K" },
] as const;

export const SettingsPopover: React.FC<SettingsPopoverProps> = ({
  model, onModelChange,
  quality, onQualityChange,
  sampler, onSamplerChange,
  negativePrompt, onNegativePromptChange,
  styleId, onStyleIdChange,
  seed, onSeedChange,
  steps, onStepsChange,
  cfgScale, onCfgScaleChange,
  onClose,
}) => (
  <div className="absolute bottom-full left-0 z-50 mb-3 w-[27rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.08] bg-[#0f1117] backdrop-blur-2xl p-5 shadow-[0_24px_80px_rgba(0,0,0,0.65)] animate-in fade-in-0 zoom-in-95 duration-150">

    <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/15 border border-indigo-500/25">
          <Settings className="h-3 w-3 text-indigo-400" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-300">
          Ajustes de generación
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 transition-all hover:bg-white/[0.06] hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>

    <div className="grid grid-cols-2 gap-3 text-zinc-400">
      <label className="col-span-2">
        <FieldLabel>Modelo</FieldLabel>
        <CustomSelect value={model} onChange={onModelChange} options={IMAGE_MODELS} />
      </label>

      <label className="col-span-2">
        <FieldLabel>Prompt negativo</FieldLabel>
        <input
          value={negativePrompt}
          onChange={(e) => onNegativePromptChange(e.target.value)}
          className={inputCls}
        />
      </label>

      <label>
        <FieldLabel>Calidad</FieldLabel>
        <CustomSelect
          value={quality}
          onChange={(v) => onQualityChange(v as ImageQuality)}
          options={QUALITY_OPTIONS}
        />
      </label>

      <label>
        <FieldLabel>Sampler</FieldLabel>
        <CustomSelect value={sampler} onChange={onSamplerChange} options={IMAGE_SAMPLERS} />
      </label>

      <label>
        <FieldLabel>Style ID</FieldLabel>
        <input
          type="number"
          min="1"
          value={styleId}
          onChange={(e) => onStyleIdChange(Number(e.target.value))}
          className={inputCls}
        />
      </label>

      <label>
        <FieldLabel>Seed</FieldLabel>
        <input
          type="number"
          value={seed}
          onChange={(e) => onSeedChange(Number(e.target.value))}
          className={inputCls}
        />
      </label>

      <label>
        <FieldLabel>Steps</FieldLabel>
        <input
          type="number"
          min="1"
          max="100"
          value={steps}
          onChange={(e) => onStepsChange(Number(e.target.value))}
          className={inputCls}
        />
      </label>

      <label>
        <FieldLabel>CFG Scale</FieldLabel>
        <input
          type="number"
          min="1"
          max="20"
          step="0.5"
          value={cfgScale}
          onChange={(e) => onCfgScaleChange(Number(e.target.value))}
          className={inputCls}
        />
      </label>
    </div>
  </div>
);
