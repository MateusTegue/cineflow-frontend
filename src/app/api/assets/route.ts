// app/api/assets/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL; // ej: https://api.tudominio.com

export async function GET() {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_API_URL no configurada" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${BACKEND_URL}/image-generation`, {
      headers: {
        // si tu backend requiere auth, agrégala aquí
        // Authorization: `Bearer ${process.env.BACKEND_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Error al consultar el backend" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "No se pudo conectar con el backend" },
      { status: 502 }
    );
  }
}