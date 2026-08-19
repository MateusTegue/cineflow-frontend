"use client";

import React from "react";
import { User } from "@/store/store";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Shield, 
  Key, 
  BadgeCheck, 
  AtSign,
  Fingerprint
} from "lucide-react";

interface ProfileDetailsProps {
  user: User | null;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const fields = [
    {
      label: "Primer Nombre",
      value: user?.firstName || "No especificado",
      icon: UserIcon,
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Segundo Nombre",
      value: user?.firstMiddleName || "No especificado",
      icon: UserIcon,
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      label: "Nombre de Usuario",
      value: user?.username ? `@${user.username}` : "No especificado",
      icon: AtSign,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Correo Electrónico",
      value: user?.email || "No especificado",
      icon: Mail,
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Teléfono",
      value: user?.phone 
        ? `${user?.codePhone ? `+${user.codePhone} ` : ""}${user.phone}`
        : "No especificado",
      icon: Phone,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Rol de Usuario",
      value: user?.role?.name || "Sin rol asignado",
      icon: Shield,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Estado de Cuenta",
      value: user?.status ? String(user.status).toUpperCase() : "ACTIVO",
      icon: BadgeCheck,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Identificador Único (ID)",
      value: user?.id || "N/A",
      icon: Fingerprint,
      accent: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0c0f1d]/85 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.45)] space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
            Información Personal y Cuenta
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Detalles registrados de tu perfil en CineFlow
          </p>
        </div>
        <span className="text-[11px] font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
          Solo Lectura
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-200"
            >
              <div
                className={`size-10 rounded-xl flex items-center justify-center border shrink-0 ${field.accent}`}
              >
                <Icon className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  {field.label}
                </span>
                <p className="text-xs sm:text-sm font-medium text-zinc-100 truncate mt-0.5">
                  {field.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
