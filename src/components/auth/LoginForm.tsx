// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/store";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const setAuth = useAuthStore((state) => state.setAuth);

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      
      setAuth(response.data.token, response.data.user);
      
      toast.success("¡Bienvenido al Studio CineFlow AI!", {
        description: "Iniciando entorno creativo...",
      });
      
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Error de autenticación", {
        description: error.message || "Credenciales incorrectas. Verifica tus datos.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-slate-200 text-[11px] font-medium">Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="creador@cineflow.ai"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  className="bg-[#0e142e]/90 border-indigo-500/25 focus-visible:border-indigo-400 focus-visible:ring-indigo-500/30 text-white placeholder:text-slate-500 h-9 text-xs rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-rose-400 text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel className="text-slate-200 text-[11px] font-medium">Contraseña</FormLabel>
                <button
                  type="button"
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isLoading}
                    className="bg-[#0e142e]/90 border-indigo-500/25 focus-visible:border-indigo-400 focus-visible:ring-indigo-500/30 text-white placeholder:text-slate-500 h-9 text-xs rounded-xl pr-9"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-rose-400 text-[11px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0 pt-0.5">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                  className="size-3.5 border-indigo-500/30 data-checked:bg-indigo-600 data-checked:border-indigo-600 rounded"
                />
              </FormControl>
              <FormLabel className="text-[11px] text-slate-300 font-normal cursor-pointer select-none">
                Recordarme en este estudio
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/30 transition-all hover:shadow-indigo-600/50 active:scale-[0.99] border-0 mt-1"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Accediendo...
            </>
          ) : (
            <>
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-indigo-200" />
              Ingresar a CineFlow AI
            </>
          )}
        </Button>

        {/* Opciones de autenticación social */}
        <div className="relative my-2.5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-indigo-500/15" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-[#0b0f24] px-2.5 text-slate-400 font-medium tracking-wider">
              O continúa con
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="h-8.5 text-xs bg-[#0e142e]/80 border-indigo-500/20 hover:bg-[#151c3d] hover:border-indigo-500/40 text-slate-200 rounded-xl"
          >
            <svg className="mr-1.5 h-3.5 w-3.5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>

          <Button
            variant="outline"
            type="button"
            disabled={isLoading}
            className="h-8.5 text-xs bg-[#0e142e]/80 border-indigo-500/20 hover:bg-[#151c3d] hover:border-indigo-500/40 text-slate-200 rounded-xl"
          >
            <svg className="mr-1.5 h-3.5 w-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
        </div>
      </form>
    </Form>
  );
}