import { useState } from "react";
import { Asset } from "@/types/asset";
import { AlertCircle, AlertTriangle, CheckCircle2, ImageOff, Loader2, Trash2 } from "lucide-react";
import { deleteAsset } from "@/services/assets.service";
import { toast } from "sonner";

interface AssetCardProps {
  asset: Asset;
  onDelete: (id: string) => void;
}

const statusStyles = {
  pending: { label: "En cola", className: "border-amber-400/20 bg-amber-400/10 text-amber-200" },
  processing: { label: "Generando", className: "border-indigo-400/25 bg-indigo-500/15 text-indigo-200" },
  completed: { label: "Lista", className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" },
  failed: { label: "Error", className: "border-rose-400/20 bg-rose-400/10 text-rose-200" },
} as const;

export function AssetCard({ asset, onDelete }: AssetCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isPending = asset.status === "pending" || asset.status === "processing";
  const isFailed = asset.status === "failed";
  const src = asset.thumbnailUrl ?? asset.imageUrl;
  const status = statusStyles[asset.status];

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteAsset(asset.id);
      onDelete(asset.id);
      toast.success("Imagen eliminada correctamente.");
    } catch (err) {
      setDeleting(false);
      setShowConfirm(false);
      toast.error("No se pudo eliminar la imagen.", {
        description: err instanceof Error ? err.message : "Inténtalo nuevamente.",
      });
    }
  };

  if (deleting) return null;

  return (
    <>
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

          <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              className="flex size-7 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-md transition-colors hover:bg-red-500/80 hover:text-white hover:border-red-400/30"
              onClick={() => setShowConfirm(true)}
              title="Eliminar imagen"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>
      </article>

      {showConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-150"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-full max-w-sm mx-4 rounded-2xl border border-white/[0.08] bg-[#0f1117] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.7)] animate-in zoom-in-95 fade-in-0 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10">
                <AlertTriangle className="size-6 text-red-400" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-white">¿Eliminar esta imagen?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Esta acción no se puede deshacer. La imagen será eliminada permanentemente.
                </p>
              </div>
              <div className="flex w-full gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex-1 rounded-xl bg-red-500/90 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-red-500 active:scale-[0.97] shadow-lg shadow-red-950/30"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
