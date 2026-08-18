// components/assets/AssetCard.tsx
import { Asset } from "@/types/asset";
import { AlertCircle, CheckCircle2, ImageOff, Loader2 } from "lucide-react";

interface AssetCardProps {
  asset: Asset;
}

const statusStyles = {
  pending: { label: "En cola", className: "border-amber-400/20 bg-amber-400/10 text-amber-200" },
  processing: { label: "Generando", className: "border-indigo-400/25 bg-indigo-500/15 text-indigo-200" },
  completed: { label: "Lista", className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" },
  failed: { label: "Error", className: "border-rose-400/20 bg-rose-400/10 text-rose-200" },
} as const;

export function AssetCard({ asset }: AssetCardProps) {
  const isPending = asset.status === "pending" || asset.status === "processing";
  const isFailed = asset.status === "failed";
  const src = asset.thumbnailUrl ?? asset.imageUrl;
  const status = statusStyles[asset.status];

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1020] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/35 hover:shadow-xl hover:shadow-indigo-950/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#11182d]">
        {isPending ? (
          <>
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-indigo-500/20 via-[#172044] to-violet-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(129,140,248,0.22),transparent_35%)]" />
          </>
        ) : isFailed ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-950/20 via-[#11182d] to-[#11182d] px-5 text-center">
            <div className="flex size-10 items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 text-rose-300"><AlertCircle className="size-5" /></div>
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-300">{asset.errorMessage ?? "No se pudo generar esta imagen."}</p>
          </div>
        ) : src ? (
          <img src={src} alt={asset.prompt} className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#11182d] to-[#0b1020]">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300">
              <ImageOff className="size-5" aria-label="Imagen no disponible" />
            </div>
          </div>
        )}

        {asset.status !== "pending" && (
          <div className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md ${status.className}`}>
            {isPending ? <Loader2 className="size-3 animate-spin" /> : isFailed ? <AlertCircle className="size-3" /> : <CheckCircle2 className="size-3" />}
            {status.label}
          </div>
        )}
      </div>
    </article>
  );
}
