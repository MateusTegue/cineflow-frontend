import React from "react";

export const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 " +
  "text-[12px] text-zinc-100 placeholder-zinc-600 transition-all outline-none " +
  "hover:border-white/[0.14] focus:border-indigo-400/50 focus:ring-2 " +
  "focus:ring-indigo-400/10 focus:bg-white/[0.06]";

export const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="block mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
    {children}
  </span>
);
