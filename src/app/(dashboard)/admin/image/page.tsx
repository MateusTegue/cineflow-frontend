import { Metadata } from "next";
import { Images } from "@/components/image/Images";

export const metadata: Metadata = {
  title: "Generador de Imágenes | CineFlow AI",
  description: "Crea y genera imágenes cinematográficas con Inteligencia Artificial",
};

export default function ImagePage() {
  return <Images />;
}