import React from "react";
import { Image as ImageIcon } from "lucide-react";

export const ImageHeader = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <ImageIcon className="w-5 h-5 text-white" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
        Image
      </h1>
    </div>
  );
};
