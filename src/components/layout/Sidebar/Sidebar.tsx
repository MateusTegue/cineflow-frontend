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
} from "lucide-react";
import { navItems, secondaryNavItems } from "@/components/options/SidebarOptions";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/store";
import { getAllTexts } from "@/services/textGenerate.service";
import { TextGenerationData } from "@/types/textGeneration.types";
import { Skeleton } from "@/components/ui/skeleton";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const [chatHistory, setChatHistory] = useState<TextGenerationData[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

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

                return (
                  <Link
                    key={chat.id}
                    href={`/admin/chatTextGenerate/${chat.id}`}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 group",
                      isChatActive
                        ? "bg-indigo-600/20 text-white font-medium border border-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    )}
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
    </aside>
  );
};