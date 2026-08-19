"use client";

import { useAssets } from "@/hooks/useAssets";
import { AssetsGrid } from "@/components/assets/AssetsGrid";
import { AssetsGridSkeleton } from "@/components/assets/AssetsGridSkeleton";

export default function AssetsPage() {
  const { assets, loading, error, removeAsset } = useAssets();

  if (loading) return <AssetsGridSkeleton />;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (assets.length === 0)
    return <p className="text-muted-foreground p-4">No hay imágenes aún.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Imágenes</h1>
      <AssetsGrid assets={assets} onDelete={removeAsset} />
    </div>
  );
}