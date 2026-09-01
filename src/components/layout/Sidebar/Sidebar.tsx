"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Clapperboard,
  Sparkles,
  MessageSquare,
  Plus,
  History,
  MoreHorizontal,
  Share2,
  Pencil,
  Pin,
  Archive,
  Trash2,
  Loader2,
} from "lucide-react";
import { navItems, secondaryNavItems } from "@/components/options/SidebarOptions";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/store";
import { getAllTexts, deleteTextGeneration } from "@/services/textGenerate.service";
import { TextGenerationData } from "@/types/textGeneration.types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [chatHistory, setChatHistory] = useState<TextGenerationData[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // Estado para el menú de 3 puntos y modal de eliminación
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeMenuId === chatId) {
      setActiveMenuId(null);
      setMenuPosition(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const ESTIMATED_MENU_HEIGHT = 210;
      const spaceBelow = window.innerHeight - rect.top;

      let top = rect.top;
      // Si no hay suficiente espacio abajo, alinear el menú hacia arriba
      if (spaceBelow < ESTIMATED_MENU_HEIGHT) {
        top = Math.max(10, rect.bottom - ESTIMATED_MENU_HEIGHT);
      }

      // Siempre mostrar el menú al lado derecho del botón/sidebar
      const left = Math.max(
        10,
        Math.min(rect.right + 8, window.innerWidth - 200)
      );

      setMenuPosition({ top, left });
      setActiveMenuId(chatId);
    }
  };

  const handleDeleteChat = async () => {
    if (!deleteTargetId) return;

    setIsDeleting(true);
    try {
      await deleteTextGeneration(deleteTargetId);
      toast.success("Chat eliminado correctamente");

      setChatHistory((prev) => prev.filter((item) => item.id !== deleteTargetId));

      if (pathname === `/admin/chatTextGenerate/${deleteTargetId}`) {
        router.push("/admin/chatTextGenerate");
      }

      window.dispatchEvent(new CustomEvent("cineflow:chat-updated"));
    } catch (error: any) {
      console.error("Error al eliminar chat:", error);
      toast.error("No se pudo eliminar el chat");
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await getAllTexts();
      setChatHistory(response.data || []);
    } catch (error) {
      console.error("Error al cargar historial de chat:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();

    const handleChatUpdated = () => {
      fetchChatHistory();
    };

    window.addEventListener("cineflow:chat-updated", handleChatUpdated);
    return () => {
      window.removeEventListener("cineflow:chat-updated", handleChatUpdated);
    };
  }, []);

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between bg-[#080b18] border-r border-indigo-500/10 text-slate-200 z-40 select-none">
      {/* Glow effect decorativo */}
      <div className="absolute top-0 left-0 w-full h-40 bg-indigo-600/5 blur-3xl pointer-events-none" />

      {/* Header / Brand & Navigation */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-5 flex items-center justify-center border-b border-indigo-500/10">
          <Link href="/dashboard" className="flex items-center justify-center gap-3 group">
            <div className="relative w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 p-[1px] shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090d20] rounded-[11px] flex items-center justify-center">
                <Clapperboard className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-tight leading-none">
                  CineFlow
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded leading-none">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-1">Video Studio</p>
            </div>
          </Link>
        </div>

        {/* Action Button */}
        <div className="px-4 pt-5 pb-2">
          <Link
            href="/admin/newVideo"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Nuevo Video</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-4 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-2">
            Navegación
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(`${item.href}`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-indigo-600/15 text-indigo-300 font-semibold border border-indigo-500/25 shadow-sm shadow-indigo-950/50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-1.5 py-0.5 text-[9px] rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Historial Section */}
        <div className="flex-1 flex flex-col min-h-0 px-3 py-2 border-t border-indigo-500/10">
          <div className="flex items-center justify-between px-3 mb-2">
            <div className="flex items-center gap-2 text-slate-400">
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Historial
              </span>
            </div>
            <Link
              href="/admin/chatTextGenerate"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Nuevo chat"
            >
              <Plus className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-y-auto max-h-[305px] space-y-1 pr-1 custom-scrollbar">
            {isLoadingHistory ? (
              <div className="space-y-2 px-2 py-1">
                <Skeleton className="h-7 w-full bg-slate-800/50 rounded-lg" />
                <Skeleton className="h-7 w-full bg-slate-800/50 rounded-lg" />
                <Skeleton className="h-7 w-full bg-slate-800/50 rounded-lg" />
              </div>
            ) : chatHistory.length === 0 ? (
              <p className="px-3 py-3 text-xs text-slate-500 italic text-center">
                Sin historial reciente
              </p>
            ) : (
              chatHistory.map((chat) => {
                const isChatActive = pathname === `/admin/chatTextGenerate/${chat.id}`;
                const isMenuOpen = activeMenuId === chat.id;

                return (
                  <div
                    key={chat.id}
                    className={cn(
                      "group relative flex items-center justify-between rounded-xl transition-all duration-150",
                      isChatActive
                        ? "bg-indigo-600/20 text-white font-medium border border-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    )}
                  >
                    <Link
                      href={`/admin/chatTextGenerate/${chat.id}`}
                      className="flex items-center gap-2 flex-1 min-w-0 px-2.5 py-2 text-xs"
                      title={chat.prompt}
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-indigo-400 transition-colors" />

                      <span className="truncate flex-1 text-xs">
                        {chat.prompt}
                      </span>

                      {chat.status === "completed" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      )}
                      {(chat.status === "pending" || chat.status === "processing") && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      )}
                      {chat.status === "failed" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      )}
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => handleOpenMenu(e, chat.id)}
                      className={cn(
                        "p-1 mr-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all cursor-pointer shrink-0",
                        isMenuOpen ? "opacity-100 bg-slate-700/60 text-white" : "opacity-0 group-hover:opacity-100"
                      )}
                      title="Opciones"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation & User Profile */}
      <div className="p-3 border-t border-indigo-500/10 space-y-2">
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;

          if (item.label === "Cerrar sesión") {
            return (
              <button
                key={item.href}
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* User Card */}
        <Link
          href="/admin/profile"
          className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/90 transition-all duration-200 group"
          title="Ver perfil"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow uppercase group-hover:scale-105 transition-transform duration-200">
            {user?.firstName?.substring(0, 2) || "CF"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-200 truncate capitalize group-hover:text-indigo-300 transition-colors">
              {user?.firstName || "Creador AI"}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {user?.role?.name || "Plan Pro"}
            </p>
          </div>
        </Link>
      </div>

      {/* Popover Menu Opciones (3 Puntos) */}
      {activeMenuId && menuPosition && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => {
              setActiveMenuId(null);
              setMenuPosition(null);
            }}
          />
          <div
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-50 w-48 rounded-2xl bg-[#0f1117] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-1.5 text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-100 space-y-0.5"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const activeChat = chatHistory.find((c) => c.id === activeMenuId);
                if (activeChat) {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/admin/chatTextGenerate/${activeChat.id}`
                  );
                  toast.success("Enlace copiado al portapapeles");
                }
                setActiveMenuId(null);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
            >
              <Share2 className="w-4 h-4 text-slate-400" />
              <span>Compartir</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toast.info("Función para cambiar el nombre próximamente");
                setActiveMenuId(null);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
            >
              <Pencil className="w-4 h-4 text-slate-400" />
              <span>Cambiar el nombre</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toast.info("Chat fijado");
                setActiveMenuId(null);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
            >
              <Pin className="w-4 h-4 text-slate-400" />
              <span>Fijar chat</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toast.info("Chat archivado");
                setActiveMenuId(null);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
            >
              <Archive className="w-4 h-4 text-slate-400" />
              <span>Archivar</span>
            </button>

            <div className="my-1 border-t border-white/[0.08]" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTargetId(activeMenuId);
                setActiveMenuId(null);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer text-left font-medium"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Eliminar</span>
            </button>
          </div>
        </>
      )}

      {/* Ventana Modal para Eliminar con el mismo bg que AssetCard */}
      {deleteTargetId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-150 p-4"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            className="w-full max-w-sm mx-4 rounded-2xl border border-white/[0.08] bg-[#0f1117] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.7)] animate-in zoom-in-95 fade-in-0 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10">
                <Trash2 className="size-6 text-red-400" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-white">¿Eliminar esta conversación?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Esta acción no se puede deshacer. La conversación será eliminada permanentemente.
                </p>
              </div>

              <div className="flex w-full gap-3 pt-1">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteTargetId(null)}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white cursor-pointer disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteChat}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-500/90 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-red-500 active:scale-[0.97] shadow-lg shadow-red-950/30 cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Eliminando...</span>
                    </>
                  ) : (
                    <span>Eliminar</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};