import axios from "axios";

export type ImageAspectRatio = "1:1" | "2:3" | "3:2" | "16:9" | "9:16";
export type ImageQuality = "standard" | "hd" | "4k";

export const IMAGE_MODELS = [
  { value: "krea2_turbo_fp8_scaled.safetensors", label: "Krea 2 Turbo (krea2_turbo_fp8_scaled.safetensors)" },
  { value: "sd_xl_base_1.0.safetensors", label: "SDXL 1.0" },
  { value: "v1-5-pruned-emaonly.safetensors", label: "Stable Diffusion 1.5" },
  { value: "sd-3-medium", label: "Stable Diffusion 3 Medium" },
  { value: "flux-1-schnell", label: "FLUX.1 Schnell" },
  { value: "flux-1-dev", label: "FLUX.1 Dev" },
] as const;

export const IMAGE_SAMPLERS = [
  { value: "dpmpp_2m", label: "DPM++ 2M" },
  { value: "euler_ancestral", label: "Euler Ancestral" },
  { value: "euler", label: "Euler" },
  { value: "ddim", label: "DDIM" },
  { value: "uni_pc", label: "UniPC" },
] as const;

export interface ImageGenerationParameters {
  seed: number;
  steps: number;
  cfgScale: number;
  sampler: string;
  model: string;
}

export interface ImageGenerationOptions {
  negativePrompt: string;
  styleId: number;
  aspectRatio: ImageAspectRatio;
  quality: ImageQuality;
  width: number;
  height: number;
  parameters: ImageGenerationParameters;
}

export interface ImageGenerationRequest extends ImageGenerationOptions {
  prompt: string;
}

interface ImageGenerationResponse<T> {
  data: T;
  code: number;
  success: boolean;
  message: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const imageDimensions: Record<
  ImageAspectRatio,
  Pick<ImageGenerationOptions, "width" | "height">
> = {
  "1:1": { width: 1024, height: 1024 },
  "2:3": { width: 832, height: 1248 },
  "3:2": { width: 1248, height: 832 },
  "16:9": { width: 1344, height: 768 },
  "9:16": { width: 768, height: 1344 },
};

export function getImageDimensions(aspectRatio: ImageAspectRatio) {
  return imageDimensions[aspectRatio];
}

export async function generateImage(
  prompt: string,
  options: ImageGenerationOptions
): Promise<ImageGenerationResponse<unknown>> {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no está configurada");
  }

  const payload: ImageGenerationRequest = {
    prompt: prompt.trim(),
    ...options,
  };

  const { data } = await axios.post<ImageGenerationResponse<unknown>>(
    `${BACKEND_URL}/comfyui`,
    payload
  );

  return data;
}