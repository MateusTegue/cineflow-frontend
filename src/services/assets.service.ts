import axios from "axios";
import { Asset, AssetsApiResponse } from "@/types/asset";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAssets(): Promise<Asset[]> {
  const { data } = await axios.get<AssetsApiResponse>(
    `${BACKEND_URL}/image-generation`
  );
  return data.data;
}

export async function deleteAsset(id: string): Promise<void> {
  await axios.delete(`${BACKEND_URL}/comfyui/${id}`);
}