"use client";

import React, { useState } from "react";
import { LocalChatMessage } from "@/types/textGeneration.types";
import { User, Sparkles, Copy, Check, Bot, Clock, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ChatMessageListProps {
  messages: LocalChatMessage[];
  isGenerating: boolean;
  activeModel?: string;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isGenerating,
  activeModel = "gpt-4o",
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6 px-4">
      {messages.map((message) => {
        const isUser = message.role === "user";
        const isSystem = message.role === "system";
        const isPending = message.status === "pending" || !message.content;

        return (
          <div
            key={message.id}
            className={`flex gap-3.5 sm:gap-4 ${isUser ? "justify-end" : "justify-start"
              }`}
          >
            {/* Assistant / System Avatar */}
            {!isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                {isSystem ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>
            )}

            {/* Message Bubble Container */}
            <div
              className={`relative group max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${isUser
                ? "bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-600/10"
                : "bg-neutral-900/90 border border-neutral-800 text-neutral-100 rounded-tl-sm backdrop-blur-md"
                }`}
            >
              {/* Message Header info for Assistant */}
              {!isUser && (
                <div className="flex items-center justify-between gap-4 mb-3 pb-2 border-b border-neutral-800/80">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                      CineFlow AI
                    </span>
                    {message.model && (
                      <span className="text-[10px] font-medium text-neutral-300 px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700/60">
                        {message.model}
                      </span>
                    )}
                    {isPending && (
                      <span className="text-[10px] font-medium text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3 animate-spin" />
                        Pending
                      </span>
                    )}
                  </div>

                  {!isPending && (
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                      title="Copiar texto"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Pending Skeleton State with metadata */}
              {!isUser && isPending ? (
                <div className="space-y-3 pt-1">
                  {/* {message.generationId && (
                    <div className="flex items-center justify-between text-xs bg-neutral-950/60 rounded-lg p-2.5 border border-neutral-800/60 text-neutral-400 mb-3">
                      <span className="truncate">
                        ID: <span className="font-mono text-neutral-300">{message.generationId}</span>
                      </span>
                      <span className="text-amber-400/90 text-[11px] font-medium flex items-center gap-1 ml-2 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        En cola
                      </span>
                    </div>
                  )} */}

                  {/* Skeleton lines */}
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full bg-neutral-800/70" />
                    <Skeleton className="h-4 w-[90%] bg-neutral-800/70" />
                    <Skeleton className="h-4 w-[75%] bg-neutral-800/70" />
                    <Skeleton className="h-4 w-[60%] bg-neutral-800/70" />
                  </div>
                </div>
              ) : (
                /* Normal Message Content */
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              )}

              {/* Copy button for User message */}
              {isUser && (
                <button
                  onClick={() => handleCopy(message.content, message.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-200 hover:text-white rounded hover:bg-blue-700/50"
                  title="Copiar texto"
                >
                  {copiedId === message.id ? (
                    <Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>

            {/* User Avatar */}
            {isUser && (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        );
      })}

      {/* Generating Skeleton (while awaiting API response) */}
      {isGenerating && (
        <div className="flex gap-3.5 sm:gap-4 justify-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl rounded-tl-sm p-4 w-full max-w-[85%] sm:max-w-[78%] space-y-3 backdrop-blur-md">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-400">CineFlow AI</span>
                <span className="text-[10px] font-medium text-neutral-300 px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700/60">
                  {activeModel}
                </span>
                <span className="text-[10px] font-medium text-blue-400 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Generando...
                </span>
              </div>
            </div>
            <div className="space-y-2.5 pt-1">
              <Skeleton className="h-4 w-full bg-neutral-800/80" />
              <Skeleton className="h-4 w-[92%] bg-neutral-800/80" />
              <Skeleton className="h-4 w-[80%] bg-neutral-800/80" />
              <Skeleton className="h-4 w-[45%] bg-neutral-800/80" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
