// components/assets/AssetsGridSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function AssetsGridSkeleton() {
  return (
    <section aria-busy="true" aria-label="Cargando imágenes" className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => {
        const animationStyle = { animationDelay: `${index * 90}ms` };

        return (
          <div
            key={index}
            style={animationStyle}
            className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1020] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/35 hover:shadow-xl hover:shadow-indigo-950/30"
          >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#11182d]">
            <Skeleton style={animationStyle} className="absolute inset-0 rounded-none bg-gradient-to-br from-indigo-500/15 via-[#172044] to-violet-500/10 [animation-duration:2.6s] [animation-timing-function:cubic-bezier(0.4,0,0.2,1)]" />
          </div>
        </div>
        );
      })}
    </section>
  );
}
