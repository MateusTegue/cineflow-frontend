"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: readonly SelectOption[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-[12px] text-zinc-100 transition-all outline-none",
          open
            ? "border-indigo-400/50 bg-white/[0.07] ring-2 ring-indigo-400/10"
            : "border-white/[0.08] bg-white/[0.04] hover:border-white/[0.14] hover:bg-white/[0.06]"
        )}
      >
        <span className="truncate text-left">{selected.label}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-zinc-500 flex-shrink-0 transition-transform duration-200",
            open && "rotate-180 text-indigo-400"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-[60] mt-1.5 w-full rounded-xl border border-white/[0.08] bg-[#0f1117]/97 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
          <ul className="py-1 max-h-48 overflow-y-auto">
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-3 py-2 text-[12px] transition-colors text-left",
                      isActive
                        ? "bg-indigo-500/15 text-indigo-300"
                        : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
