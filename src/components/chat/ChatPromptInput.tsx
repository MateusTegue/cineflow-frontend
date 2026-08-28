"use client";

import React, { useRef, useEffect } from "react";
import { ArrowUp, Sliders, Trash2, Sparkles } from "lucide-react";

interface ChatPromptInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isGenerating: boolean;
  onOpenSettings: () => void;
  onClearChat: () => void;
  hasMessages: boolean;
  selectedModel: string;
}

export const ChatPromptInput: React.FC<ChatPromptInputProps> = ({
  input,
  onInputChange,
  onSend,
  isGenerating,
  onOpenSettings,
  onClearChat,
  hasMessages,
  selectedModel,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isGenerating) {
        onSend();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative bg-neutral-900/90 border border-neutral-800 rounded-2xl shadow-2xl backdrop-blur-xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje o prompt cinematográfico... (Shift + Enter para salto de línea)"
          disabled={isGenerating}
          rows={1}
          className="w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 px-4 pt-3.5 pb-2 focus:outline-none resize-none max-h-[200px] overflow-y-auto leading-relaxed"
        />

        {/* Action Bar */}
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="flex items-center gap-1.5">
            {/* Settings Button */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/80 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Ajustes</span>
              <span className="text-[11px] text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">
                {selectedModel}
              </span>
            </button>

            {/* Clear Chat Button */}
            {hasMessages && (
              <button
                type="button"
                onClick={onClearChat}
                className="px-2 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-rose-400 hover:bg-neutral-800/80 transition-colors flex items-center gap-1 cursor-pointer"
                title="Limpiar conversación"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={onSend}
            disabled={!input.trim() || isGenerating}
            className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
              input.trim() && !isGenerating
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            {isGenerating ? (
              <Sparkles className="w-4 h-4 animate-spin text-blue-300" />
            ) : (
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-center text-neutral-400 mt-2">
        CineFlow AI puede cometer errores. Verifica la información importante.
      </p>
    </div>
  );
};
