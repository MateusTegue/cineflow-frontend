import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | CineFlow AI",
  description: "Panel principal de CineFlow AI Video Studio",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Bienvenido al Dashboard de CineFlow AI
        </h1>
        <p className="text-slate-400 text-sm">
          Panel de creación y gestión de videos con Inteligencia Artificial en construcción.
        </p>
      </div>
    </div>
  );
}
