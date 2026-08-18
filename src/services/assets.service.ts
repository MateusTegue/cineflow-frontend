import { Asset, AssetsApiResponse  } from "@/types/asset";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getAssets(): Promise<Asset[]> {
  const res = await fetch(`${BACKEND_URL}/image-generation`);
  if (!res.ok) throw new Error("Error al cargar los assets");
  const json: AssetsApiResponse = await res.json();
  return json.data;
}

export async function deleteAsset(id: string): Promise<void> {
  const res = await fetch(`${BACKEND_URL}/image-generation/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el asset");
}