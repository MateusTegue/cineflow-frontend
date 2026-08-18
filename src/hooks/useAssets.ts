import { useEffect, useState, useCallback } from "react";
import { Asset } from "@/types/asset";
import { getAssets } from "@/services/assets.service";

const MINIMUM_LOADING_TIME = 1200;

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    const startedAt = Date.now();

    setLoading(true);
    setError(null);
    try {
      const data = await getAssets();
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - (Date.now() - startedAt));

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return { assets, loading, error, refetch: fetchAssets };
}
