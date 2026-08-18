import React from "react";
import { Sparkles, Video, Clapperboard, Film, Zap, Play } from "lucide-react";

export const metadata = {
  title: "CineFlow AI - Creación de Videos con Inteligencia Artificial",
  description: "Inicia sesión en CineFlow y genera videos cinematográficos con IA",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center bg-[#060814] text-slate-100 px-4 sm:px-8 py-4 overflow-x-hidden">
      {/* Luces y orbes cósmicos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[130px]" />
        {/* Patrón de cuadrícula tenue */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Espaciador superior */}
      <div className="w-full h-2 sm:h-4 pointer-events-none" />

      {/* Contenedor principal distribuido con el formulario más hacia la derecha */}
      <main className="relative w-full max-w-[1260px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 my-auto py-4 z-10 px-2 sm:px-4">
        
        {/* Lado Izquierdo - Branding & Showcase de IA */}
        <div className="hidden lg:flex flex-col items-start space-y-7 max-w-xl">
          
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 p-[1px] shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full bg-[#090d20] rounded-[11px] flex items-center justify-center">
                <Clapperboard className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">CineFlow</h1>
                <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  AI Video Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">Next-Gen Video Synthesis</p>
            </div>
          </div>

          {/* Titular de impacto */}
          <div className="space-y-2.5">
            <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Genera videos <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                cinematográficos con IA
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Transforma ideas y guiones en producciones visuales hiperrealistas 4K con control total de cámara, iluminación y animación neuronal.
            </p>
          </div>

          {/* Características clave */}
          <div className="grid grid-cols-1 gap-2.5 w-full">
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0d1229]/80 border border-indigo-500/15 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Text-to-Video & Image-to-Video</h4>
                <p className="text-xs text-slate-400">Genera tomas cinematográficas fluidas a partir de cualquier prompt o imagen.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0d1229]/80 border border-indigo-500/15 backdrop-blur-sm">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Control de Cámara Cinemática</h4>
                <p className="text-xs text-slate-400">Panorámicas, travellings, zoom y movimientos de cámara profesionales.</p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex -space-x-2.5">
              {["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#060814] flex items-center justify-center text-[10px] font-bold text-white shadow-md"
                  style={{ backgroundColor: color }}
                >
                  {["AI", "FX", "4K", "CF"][i]}
                </div>
              ))}
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-200 block">+50,000 creadores y directores</span>
              <span className="text-slate-400">Creando el futuro del cine y la animación</span>
            </div>
          </div>

        </div>

        {/* Lado Derecho - Formulario más compacto y orientado a la derecha */}
        <div className="w-full max-w-[390px] lg:ml-auto">
          {children}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative w-full py-3 text-center text-xs text-slate-500 z-10">
        <p>© 2025 CineFlow AI. Impulsado por Redes Neuronales Cinematográficas.</p>
      </footer>
    </div>
  );
}