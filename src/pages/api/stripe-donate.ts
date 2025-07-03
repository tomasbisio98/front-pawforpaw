import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }


    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/donations/checkout`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status(200).json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error creando sesión de Stripe:", error);
    return res.status(500).json({
      message: "Error en servidor",
      error: error.response?.data || error.message,
    });
  }
}
