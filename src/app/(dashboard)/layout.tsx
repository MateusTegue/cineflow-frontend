import React from "react";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export const metadata = {
  title: "Dashboard | CineFlow AI",
  description: "Panel de administración y gestión de videos en CineFlow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-[#060814] text-slate-100">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto p-6 md:p-8 bg-[#060814]">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
