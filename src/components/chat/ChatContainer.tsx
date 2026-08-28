"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LocalChatMessage, TextGenerationData } from "@/types/textGeneration.types";
import { createTextGeneration, getAllTexts } from "@/services/textGenerate.service";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatMessageList } from "./ChatMessageList";
import { ChatPromptInput } from "./ChatPromptInput";
import { ChatSettingsModal, ChatSettings } from "./ChatSettingsModal";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatContainerProps {
  chatId?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ chatId: propChatId }) => {
  const params = useParams();
  const router = useRouter();
  const currentChatId = propChatId || (params?.id as string | undefined);

  const [messages, setMessages] = useState<LocalChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(() => Boolean(currentChatId));
  const [conversationId, setConversationId] = useState<string>(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `conv_${Date.now()}`
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    model: "qwen3vl_4b_fp8_scaled.safetensors",
    systemPrompt: "Eres un asistente creativo cinematográfico y narrativo de CineFlow.",
    temperature: 0.7,
    maxTokens: 512,
    topP: 0.95,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Cargar historial si hay currentChatId
  useEffect(() => {
    if (!currentChatId) {
      // Si no hay ID, es un nuevo chat
      setMessages([]);
      setIsLoadingHistory(false);
      setConversationId(
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `conv_${Date.now()}`
      );
      return;
    }

    const loadChatHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const response = await getAllTexts();
        const allItems: TextGenerationData[] = response.data || [];

        // Buscar el item seleccionado
        const targetItem = allItems.find((item) => item.id === currentChatId);

        if (targetItem) {
          // Filtrar items de la misma conversación si existe conversationId, o solo el target
          const convId = targetItem.conversationId;
          const relatedItems = convId
            ? allItems
                .filter((item) => item.conversationId === convId)
                .sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                )
            : [targetItem];

          const loadedMessages: LocalChatMessage[] = [];

          relatedItems.forEach((item) => {
            // Mensaje de usuario
            loadedMessages.push({
              id: `user_${item.id}`,
              role: "user",
              content: item.prompt,
              createdAt: new Date(item.created_at),
              status: "sent",
            });

            // Mensaje de asistente
            loadedMessages.push({
              id: `assistant_${item.id}`,
              role: "assistant",
              content: item.response || "",
              createdAt: new Date(item.updated_at || item.created_at),
              status: (item.status as any) || (item.response ? "sent" : "pending"),
              model: item.model || targetItem.model,
              generationId: item.id,
            });
          });

          setMessages(loadedMessages);
          setConversationId(convId || targetItem.id);
          if (targetItem.model) {
            setSettings((prev) => ({ ...prev, model: targetItem.model }));
          }
        }
      } catch (error) {
        console.error("Error al cargar chat:", error);
        toast.error("No se pudo cargar la conversación previa");
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [currentChatId]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);


  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isGenerating) return;

    const userMessageId = `user_${Date.now()}`;
    const newUserMessage: LocalChatMessage = {
      id: userMessageId,
      role: "user",
      content: promptText,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      const response = await createTextGeneration({
        prompt: promptText,
        conversationId,
        systemPrompt: settings.systemPrompt || undefined,
        model: settings.model,
        role: "user",
        temperature: settings.temperature,
        maxTokens: settings.maxTokens,
        parameters: {
          topP: settings.topP,
          frequencyPenalty: settings.frequencyPenalty,
          presencePenalty: settings.presencePenalty,
        },
      });

      const responseData = response.data;

      // Si el backend guardó el prompt y generó una respuesta o la guardó como entidad
      const assistantContent =
        responseData?.response ||
        `Texto registrado con ID: ${responseData?.id}.\nEstado: ${responseData?.status || "pending"}`;

      const newAssistantMessage: LocalChatMessage = {
        id: `assistant_${responseData?.id || Date.now()}`,
        role: "assistant",
        content: responseData?.response || "",
        status: (responseData?.status as any) || (responseData?.response ? "sent" : "pending"),
        createdAt: new Date(),
        model: responseData?.model || settings.model,
        generationId: responseData?.id,
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
      toast.success("Texto registrado con éxito");

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cineflow:chat-updated"));
      }

      // Si estábamos en nuevo chat y recibimos un id, actualizar URL limpiamente
      if (!currentChatId && responseData?.id) {
        router.push(`/admin/chatTextGenerate/${responseData.id}`);
      }
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Error al comunicarse con el servicio de generación de texto";

      toast.error("No se pudo generar el texto", {
        description: errorMsg,
      });

      const errorAssistantMessage: LocalChatMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: `Error: ${errorMsg}. Por favor, verifica tu conexión o intenta nuevamente.`,
        createdAt: new Date(),
        status: "error",
      };

      setMessages((prev) => [...prev, errorAssistantMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setConversationId(
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `conv_${Date.now()}`
    );
    router.push("/admin/chatTextGenerate");
    toast.info("Nueva conversación iniciada");
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-neutral-950/40">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[200px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Chat Scroll Area */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto px-2 sm:px-4 py-4"
      >
        {isLoadingHistory ? (
          <div className="space-y-6 max-w-4xl mx-auto py-6 px-4 animate-in fade-in duration-200">
            {/* Skeleton User Message */}
            <div className="flex gap-3.5 sm:gap-4 justify-end">
              <div className="bg-blue-600/20 border border-blue-500/20 rounded-2xl rounded-tr-sm p-4 w-full max-w-[65%] space-y-2">
                <Skeleton className="h-4 w-full bg-blue-400/20" />
                <Skeleton className="h-4 w-[60%] bg-blue-400/20" />
              </div>
              <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                <Skeleton className="w-full h-full rounded-xl bg-neutral-700/50" />
              </div>
            </div>

            {/* Skeleton Assistant Message */}
            <div className="flex gap-3.5 sm:gap-4 justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0">
                <Skeleton className="w-full h-full rounded-xl bg-blue-500/30" />
              </div>
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl rounded-tl-sm p-4 w-full max-w-[78%] space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800/80">
                  <Skeleton className="h-3 w-20 bg-neutral-800" />
                  <Skeleton className="h-3 w-16 bg-neutral-800" />
                </div>
                <div className="space-y-2.5 pt-1">
                  <Skeleton className="h-4 w-full bg-neutral-800/70" />
                  <Skeleton className="h-4 w-[92%] bg-neutral-800/70" />
                  <Skeleton className="h-4 w-[80%] bg-neutral-800/70" />
                  <Skeleton className="h-4 w-[45%] bg-neutral-800/70" />
                </div>
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <ChatEmptyState
            selectedModel={settings.model}
            onSelectPrompt={(prompt) => {
              setInput(prompt);
              handleSendMessage(prompt);
            }}
          />
        ) : (
          <ChatMessageList
            messages={messages}
            isGenerating={isGenerating}
            activeModel={settings.model}
          />
        )}
      </div>

      {/* Chat Input Floating Area */}
      <div className="relative z-20 pb-4 pt-2 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent">
        <ChatPromptInput
          input={input}
          onInputChange={setInput}
          onSend={() => handleSendMessage()}
          isGenerating={isGenerating}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onClearChat={handleClearChat}
          hasMessages={messages.length > 0}
          selectedModel={settings.model}
        />
      </div>

      {/* Settings Modal */}
      <ChatSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          toast.success("Ajustes guardados");
        }}
      />
    </div>
  );
};
export default ChatContainer;
