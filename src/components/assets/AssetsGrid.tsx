import { Asset } from "@/types/asset";
import { AssetCard } from "./AssetCard";

interface AssetsGridProps {
  assets: Asset[];
  onDelete: (id: string) => void;
}

export function AssetsGrid({ assets, onDelete }: AssetsGridProps) {
  return (
    <section
      aria-label="Imágenes generadas"
      className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4"
    >
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} onDelete={onDelete} />
      ))}
    </section>
  );
}
