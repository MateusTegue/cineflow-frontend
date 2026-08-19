"use client";

import React from "react";
import { User } from "@/store/store";
import { 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  User as UserIcon, 
  Calendar, 
  CheckCircle2, 
  Crown 
} from "lucide-react";

interface ProfileHeaderProps {
  user: User | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const initials = user?.firstName
    ? user.firstName.substring(0, 2).toUpperCase()
    : user?.username
    ? user.username.substring(0, 2).toUpperCase()
    : "CF";

  const fullName = [user?.firstName, user?.firstMiddleName].filter(Boolean).join(" ") || user?.username || "Usuario";
  const roleName = user?.role?.name || "Creador AI";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0f1d]/85 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
      {/* Decorative ambient gradients */}
      <div className="absolute -right-16 -top-16 size-64 bg-gradient-to-bl from-indigo-500/20 via-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 size-64 bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left side: Avatar + Info */}
        <div className="flex items-center gap-5 sm:gap-6">
          {/* Avatar with gradient ring */}
          <div className="relative group shrink-0">
            <div className="size-20 sm:size-24 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-0.5 shadow-xl shadow-indigo-950/50">
              <div className="size-full bg-[#0d1226] rounded-[14px] flex items-center justify-center text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
                {initials}
              </div>
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 size-7 rounded-full bg-emerald-500 border-2 border-[#0c0f1d] flex items-center justify-center shadow-md">
              <CheckCircle2 className="size-4 text-white" />
            </div>
          </div>

          {/* User names & tags */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight capitalize">
                {fullName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm">
                <Crown className="size-3 text-indigo-400" />
                {roleName}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                Activo
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 font-normal flex items-center gap-2">
              <span>@{user?.username || "usuario"}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">{user?.email || "Sin email"}</span>
            </p>
          </div>
        </div>

        {/* Right side: Quick stats/badge */}
        <div className="flex items-center gap-3 w-full md:w-auto self-stretch md:self-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
          <div className="flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center gap-3">
            <div className="size-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Cuenta Verificada</p>
              <p className="text-xs font-semibold text-zinc-200">ID: {user?.id ? user.id.substring(0, 8) : "N/A"}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
