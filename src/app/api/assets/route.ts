import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_API_URL no configurada" },
      { status: 500 }
    );
  }

  try {
    const { data, status } = await axios.get(
      `${BACKEND_URL}/image-generation`
    );
    return NextResponse.json(data, { status });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data ?? { error: "Error al consultar el backend" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "No se pudo conectar con el backend" },
      { status: 502 }
    );
  }
}