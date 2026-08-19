"use client";

import React from "react";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  LogOut,
  AtSign,
  Fingerprint,
  CheckCircle2,
  Crown
} from "lucide-react";

export const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const initials = user?.firstName
    ? user.firstName.substring(0, 2).toUpperCase()
    : user?.username
      ? user.username.substring(0, 2).toUpperCase()
      : "CF";

  const fullName = [user?.firstName, user?.firstMiddleName].filter(Boolean).join(" ") || user?.username || "Usuario";
  const roleName = user?.role?.name || "Creador AI";

  return (
    <div className="w-full max-w-4xl mx-auto my-auto">
      {/* Main Profile Card Container */}
      <div className="relative p-2 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Avatar & summary under avatar */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            {/* Circular Avatar (rounded-full) */}
            <div className="relative group w-full max-w-[240px] aspect-square">
              <div className="size-full rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 p-[3px] shadow-2xl shadow-indigo-950/60">
                <div className="size-full bg-[#0d1226] rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent pointer-events-none" />
                  <span className="text-6xl sm:text-7xl font-black text-white tracking-wider uppercase select-none drop-shadow-md">
                    {initials}
                  </span>
                </div>
              </div>

              {/* Active badge placed outside overflow-hidden */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d1226] border border-emerald-500/50 shadow-xl shadow-black/80 z-20">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider whitespace-nowrap">
                  Activo
                </span>
              </div>
            </div>

            {/* Information under avatar */}
            <div className="w-full max-w-[250px] space-y-2 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Rol</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300">
                  <Crown className="size-3 text-indigo-400" />
                  {roleName}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500">ID de Usuario</span>
                <span className="text-[11px] font-mono text-zinc-300 truncate block mt-0.5" title={user?.id}>
                  {user?.id ? `${user.id.substring(0, 16)}...` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: User details list + Logout button */}
          <div className="md:col-span-8 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              {/* User Title & Username */}
              <div className="border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight capitalize">
                    {fullName}
                  </h1>
                </div>
                <p className="text-sm font-medium text-indigo-400 mt-1">
                  @{user?.username || "usuario"}
                </p>
              </div>

              {/* Data list rows */}
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="size-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Correo Electrónico</span>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">{user?.email || "No especificado"}</p>
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="size-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <AtSign className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Nombre de Usuario</span>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">{user?.username ? `@${user.username}` : "No especificado"}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="size-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Teléfono</span>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 truncate">
                      {user?.phone ? `${user?.codePhone ? `${user.codePhone} ` : ""}${user.phone}` : "No especificado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Action Button (Bottom Right) */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 active:scale-[0.98] text-white text-xs font-semibold shadow-lg shadow-red-950/40 transition-all duration-200"
              >
                <LogOut className="size-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
