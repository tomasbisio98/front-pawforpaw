"use client";

import useAdminOutOfPublic from "@/hooks/useAdminOutOfPublic";
import usePrivate from "@/hooks/usePrivate";
import { XCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CancelContent() {
  const protection = useAdminOutOfPublic();
  const loading = usePrivate();
  const searchParams = useSearchParams();
  const donationId = searchParams?.get("donationId") ?? null;

  const [estado, setEstado] = useState<"checking" | "failed" | "canceled" | "unknown">("checking");

  useEffect(() => {
    const verificarEstado = async () => {
      if (!donationId) {
        setEstado("unknown");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/donations/${donationId}/status`
        );
        const status = res.data.status?.toUpperCase();

        if (status === "FAILED") setEstado("failed");
        else if (status === "CANCELED") setEstado("canceled");
        else if (status === "PENDING") {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/donations/${donationId}/status`,
            { status: "CANCELED" }
          );
          setEstado("canceled");
        } else setEstado("unknown");
      } catch (error) {
        console.error("❌ Error al consultar estado:", error);
        setEstado("unknown");
      }
    };

    verificarEstado();
  }, [donationId]);

  if (loading) return loading;
  if (protection) return protection;

  const renderMensaje = () => {
    switch (estado) {
      case "failed":
        return (
          <>
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-marronOscuro mb-2">Pago rechazado</h1>
            <p className="text-gray-600 text-sm mb-4">
              Tu tarjeta fue rechazada. Verifica la información o intenta con otro medio de pago.
            </p>
          </>
        );
      case "canceled":
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-marronOscuro mb-2">Proceso cancelado</h1>
            <p className="text-gray-600 text-sm mb-4">
              Cancelaste el proceso de pago. Puedes intentarlo nuevamente si lo deseas.
            </p>
          </>
        );
      default:
        return (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-marronOscuro mb-2">Algo salió mal</h1>
            <p className="text-gray-600 text-sm mb-4">
              No pudimos verificar el estado del pago. Intenta nuevamente más tarde.
            </p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-verdeClaro via-blancoConVerde to-verdeSuave flex items-center justify-center px-4 font-nunito">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
        {renderMensaje()}
        <Link
          href="/"
          className="inline-block bg-verdeClaro text-white px-5 py-2 rounded-lg hover:bg-verdeOscuro transition-colors mt-4"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
