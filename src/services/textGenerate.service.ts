import axios from "axios";
import {
  ApiResponse,
  CreateTextGenerationPayload,
  TextGenerationData,
} from "@/types/textGeneration.types";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export const AVAILABLE_TEXT_MODELS = [
  {
    value: "qwen3vl_4b_fp8_scaled.safetensors",
    label: "Qwen 3 VL 4B (ComfyUI)",
    description: "Modelo visual y de texto con arquitectura CLIP ideogram4",
    badge: "ComfyUI Local",
  },
  {
    value: "gpt-4o",
    label: "GPT-4o (Omni)",
    description: "Modelo insignia más potente e inteligente",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o Mini",
    description: "Rápido, eficiente y económico para tareas generales",
  },
  {
    value: "gpt-4-turbo",
    label: "GPT-4 Turbo",
    description: "Gran capacidad de razonamiento complejo",
  },
  {
    value: "claude-3-5-sonnet",
    label: "Claude 3.5 Sonnet",
    description: "Excelente para escritura creativa y guiones",
  },
  {
    value: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    description: "Ventana de contexto ultra larga",
  },
] as const;

export async function createTextGeneration(
  payload: CreateTextGenerationPayload
): Promise<ApiResponse<TextGenerationData>> {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no está configurada");
  }

  const { data } = await axios.post<ApiResponse<TextGenerationData>>(
    `${BACKEND_URL}/text-generation`,
    payload
  );

  return data;
}

export async function getAllTexts(): Promise<ApiResponse<TextGenerationData[]>> {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no está configurada");
  }

  const { data } = await axios.get<ApiResponse<TextGenerationData[]>>(
    `${BACKEND_URL}/text-generation`
  );

  return data;
}

export async function deleteTextGeneration(id: string): Promise<ApiResponse<null>> {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_API_URL no está configurada");
  }

  const { data } = await axios.delete<ApiResponse<null>>(
    `${BACKEND_URL}/text-generation/${id}`
  );

  return data;
}

