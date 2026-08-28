import { LucideIcon, LayoutDashboard, Film, User, LogIn, Sparkles, Video, Image as ImageIcon, MessageSquare, MessageSquareDotIcon } from "lucide-react";
import { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon | ComponentType<{ className?: string }>;
  badge?: string;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mis Videos", href: "/admin/videos", icon: Video },
  { label: "Imágenes", href: "/admin/image", icon: ImageIcon },
  { label: "Chat", href: "/admin/chatTextGenerate", icon: MessageSquareDotIcon },
  { label: "Assets", href: "/admin/assets", icon: Sparkles },
  { label: "Perfil", href: "/admin/profile", icon: User },
];

export const secondaryNavItems: NavItem[] = [
  { label: "Cerrar sesión", href: "/login", icon: LogIn },
];
