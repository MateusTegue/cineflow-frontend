// components/auth/AuthCard.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Clapperboard } from "lucide-react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <div className={cn(
      "relative w-full bg-[#0b0f24]/90 backdrop-blur-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-950/60 rounded-2xl p-6 sm:p-7 transition-all",
      "hover:border-indigo-500/30",
      className
    )}>
      {/* Resplandor superior sutil */}
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      
      <div className="text-center mb-5">
        {/* Logo versión móvil */}
        <div className="flex justify-center lg:hidden mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 p-[1px] shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-[#090d20] rounded-[11px] flex items-center justify-center">
              <Clapperboard className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {children}
      </div>

      {footer && (
        <div className="mt-4 pt-4 border-t border-indigo-500/10 text-center">
          {footer}
        </div>
      )}
    </div>
  );
}