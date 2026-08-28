"use client";

import React from "react";
import { X, Sliders, Sparkles, Check } from "lucide-react";
import { AVAILABLE_TEXT_MODELS } from "@/services/textGenerate.service";

export interface ChatSettings {
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

interface ChatSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ChatSettings;
  onSave: (settings: ChatSettings) => void;
}

export const ChatSettingsModal: React.FC<ChatSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = React.useState<ChatSettings>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Ajustes de Generación de Texto
              </h3>
              <p className="text-xs text-neutral-400">
                Personaliza el comportamiento del modelo de IA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-left">
          {/* Modelo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
              Modelo de IA
            </label>
            <div className="space-y-2">
              {AVAILABLE_TEXT_MODELS.map((m) => {
                const isSelected = localSettings.model === m.value;
                return (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() =>
                      setLocalSettings({ ...localSettings, model: m.value })
                    }
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-blue-600/15 border-blue-500/50 text-white"
                        : "bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{m.label}</span>
                        {"badge" in m && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-medium border border-blue-500/30">
                            {m.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {m.description}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              System Prompt (Instrucciones del Sistema)
            </label>
            <textarea
              rows={3}
              value={localSettings.systemPrompt}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  systemPrompt: e.target.value,
                })
              }
              placeholder="Ej: Eres un guionista cinematográfico profesional especializado en ciencia ficción..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 resize-none"
            />
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Temperatura (Creatividad)
              </label>
              <span className="text-xs font-mono text-blue-400">
                {localSettings.temperature}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={localSettings.temperature}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  temperature: parseFloat(e.target.value),
                })
              }
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
              <span>Preciso (0.0)</span>
              <span>Balanceado (0.7)</span>
              <span>Muy Creativo (2.0)</span>
            </div>
          </div>

          {/* Max Tokens */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Máximo de Tokens
              </label>
              <span className="text-xs font-mono text-blue-400">
                {localSettings.maxTokens}
              </span>
            </div>
            <input
              type="number"
              min="100"
              max="8192"
              step="128"
              value={localSettings.maxTokens}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  maxTokens: parseInt(e.target.value) || 1024,
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-sm text-neutral-200 focus:outline-none focus:border-blue-500/60"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
