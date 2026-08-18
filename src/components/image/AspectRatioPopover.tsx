"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface AspectRatioOption {
  label: string;
  value: string;
  widthRatio: number;
  heightRatio: number;
  btnWidth: string;
  btnHeight: string;
}

export const ASPECT_RATIOS: AspectRatioOption[] = [
  // Row 1
  { label: "4:3", value: "4:3", widthRatio: 4, heightRatio: 3, btnWidth: "w-11", btnHeight: "h-9" },
  { label: "16:9", value: "16:9", widthRatio: 16, heightRatio: 9, btnWidth: "w-14", btnHeight: "h-8" },
  { label: "3:2", value: "3:2", widthRatio: 3, heightRatio: 2, btnWidth: "w-12", btnHeight: "h-8" },
  // Row 2
  { label: "1:1", value: "1:1", widthRatio: 1, heightRatio: 1, btnWidth: "w-11", btnHeight: "h-11" },
  { label: "2:3", value: "2:3", widthRatio: 2, heightRatio: 3, btnWidth: "w-9", btnHeight: "h-13" },
  { label: "9:16", value: "9:16", widthRatio: 9, heightRatio: 16, btnWidth: "w-7", btnHeight: "h-13" },
];

interface AspectRatioPopoverProps {
  currentRatio: string;
  onSelectRatio: (ratio: string) => void;
}

export const AspectRatioPopover: React.FC<AspectRatioPopoverProps> = ({
  currentRatio,
  onSelectRatio,
}) => {
  const [hoveredRatio, setHoveredRatio] = useState<string | null>(null);

  const displayRatio = hoveredRatio || currentRatio;
  const activeOption =
    ASPECT_RATIOS.find((r) => r.value === displayRatio) ||
    ASPECT_RATIOS.find((r) => r.value === currentRatio) ||
    ASPECT_RATIOS[4]; // 2:3 fallback

  return (
    <div className="absolute bottom-full pb-2.5 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
      <div className="flex items-center gap-5 p-4 rounded-3xl bg-[#191b22]/95 border border-white/10 backdrop-blur-2xl shadow-2xl text-white select-none">
        
        {/* Left Side: 2 Rows of Proportion Buttons */}
        <div className="flex flex-col gap-3">
          {/* Row 1: 4:3, 16:9, 3:2 */}
          <div className="flex items-center justify-start gap-3 h-10">
            {ASPECT_RATIOS.slice(0, 3).map((item) => {
              const isSelected = currentRatio === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectRatio(item.value);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectRatio(item.value);
                  }}
                  onMouseEnter={() => setHoveredRatio(item.value)}
                  onMouseLeave={() => setHoveredRatio(null)}
                  className={cn(
                    "flex items-center justify-center rounded-lg text-[11px] font-bold transition-all cursor-pointer",
                    item.btnWidth,
                    item.btnHeight,
                    isSelected
                      ? "border-2 border-white text-white bg-zinc-800/90 shadow-md"
                      : "border border-zinc-700/80 bg-zinc-800/40 text-zinc-300 hover:border-zinc-500 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Row 2: 1:1, 2:3, 9:16 */}
          <div className="flex items-center justify-start gap-3 h-14">
            {ASPECT_RATIOS.slice(3, 6).map((item) => {
              const isSelected = currentRatio === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectRatio(item.value);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectRatio(item.value);
                  }}
                  onMouseEnter={() => setHoveredRatio(item.value)}
                  onMouseLeave={() => setHoveredRatio(null)}
                  className={cn(
                    "flex items-center justify-center rounded-lg text-[11px] font-bold transition-all cursor-pointer",
                    item.btnWidth,
                    item.btnHeight,
                    isSelected
                      ? "border-2 border-white text-white bg-zinc-800/90 shadow-md"
                      : "border border-zinc-700/80 bg-zinc-800/40 text-zinc-300 hover:border-zinc-500 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Visual Ratio Wireframe with 3x3 Rule of Thirds Grid */}
        <div className="w-28 h-28 flex items-center justify-center pl-2 border-l border-white/5">
          <div
            className="border-2 border-white rounded-xl relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
            style={{
              width:
                activeOption.widthRatio >= activeOption.heightRatio
                  ? "88px"
                  : `${Math.round((activeOption.widthRatio / activeOption.heightRatio) * 100)}px`,
              height:
                activeOption.heightRatio >= activeOption.widthRatio
                  ? "104px"
                  : `${Math.round((activeOption.heightRatio / activeOption.widthRatio) * 88)}px`,
              maxHeight: "104px",
              maxWidth: "88px",
            }}
          >
            {/* 3x3 Rule of Thirds Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-zinc-700/60" />
              <div className="border-r border-b border-zinc-700/60" />
              <div className="border-b border-zinc-700/60" />
              <div className="border-r border-b border-zinc-700/60" />
              <div className="border-r border-b border-zinc-700/60" />
              <div className="border-b border-zinc-700/60" />
              <div className="border-r border-zinc-700/60" />
              <div className="border-r border-zinc-700/60" />
              <div />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
