import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Iniciar Sesión | CineFlow AI",
  description: "Accede al estudio de creación de video con inteligencia artificial de CineFlow",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Acceso al Studio AI"
      description="Ingresa a tu cuenta para crear y renderizar videos"
      footer={
        <div className="text-xs text-slate-400">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-medium text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Crear cuenta gratuita
          </Link>
        </div>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}