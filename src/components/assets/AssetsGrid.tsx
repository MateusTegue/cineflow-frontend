import { Asset } from "@/types/asset";
import { AssetCard } from "./AssetCard";

interface AssetsGridProps {
  assets: Asset[];
}

export function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <section
      aria-label="Imágenes generadas"
      className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4"
    >
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </section>
  );
}
