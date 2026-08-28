export type ChatRole = "user" | "assistant" | "system";

export type GenerationStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface TextGenerationParameters {
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
  [key: string]: any;
}

export interface CreateTextGenerationPayload {
  prompt: string;
  conversationId?: string;
  systemPrompt?: string;
  model?: string;
  role?: ChatRole;
  temperature?: number;
  maxTokens?: number;
  parameters?: TextGenerationParameters;
}

export interface TextGenerationData {
  id: string;
  created_at: string;
  updated_at: string;
  conversationId?: string | null;
  prompt: string;
  response?: string | null;
  systemPrompt?: string | null;
  model: string;
  role: ChatRole;
  status: GenerationStatus;
  temperature?: number;
  maxTokens?: number;
  promptTokens?: number | null;
  completionTokens?: number | null;
  totalTokens?: number | null;
  generationTimeMs?: number | null;
  errorMessage?: string | null;
  parameters?: TextGenerationParameters | null;
}

export interface ApiResponse<T> {
  data: T;
  code: number;
  success: boolean;
  message: string;
  errors?: string[];
}

export interface LocalChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
  status?: "pending" | "sent" | "error";
  model?: string;
  generationId?: string;
}
