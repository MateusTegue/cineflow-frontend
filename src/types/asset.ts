export type GenerationStatus = "pending" | "processing" | "completed" | "failed";

export interface AssetParameters {
  seed: number;
  model: string;
  steps: number;
  sampler: string;
  cfgScale: number;
}

export interface Asset {
  id: string;
  createdAt: string;
  updatedAt: string;
  prompt: string;
  negativePrompt: string | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  status: GenerationStatus;
  aspectRatio: string;
  width: number;
  height: number;
  errorMessage: string | null;
  parameters: AssetParameters;
}

export interface AssetsApiResponse {
  data: Asset[];
  code: number;
  success: boolean;
  message: string;
  errors: string[];
}