import { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Registrarse | CineFlow AI",
  description: "Crea tu cuenta en CineFlow AI y comienza a generar videos con IA",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crear cuenta en CineFlow AI"
      description="Únete y accede a los modelos neuronales de video más potentes"
      footer={
        <div className="text-xs text-slate-400">
          ¿Ya tienes una cuenta de creador?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      }
    >
      <div className="text-center py-6 border border-dashed border-indigo-500/20 rounded-xl bg-indigo-950/20 text-slate-400 text-sm">
        Formulario de registro de creador en construcción
      </div>
    </AuthCard>
  );
}
