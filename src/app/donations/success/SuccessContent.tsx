"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const donationId = searchParams?.get("donationId");

  return (
    <div className="min-h-screen bg-gradient-to-br from-verdeClaro via-blancoConVerde to-verdeSuave flex items-center justify-center px-4 font-nunito">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-marronOscuro mb-2">
          ¡Gracias por tu donación!
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Tu apoyo es muy valioso para nosotros.
        </p>

        {donationId ? (
          <p className="text-gray-500 text-sm">
            Número de referencia: <span className="font-semibold">{donationId}</span>
          </p>
        ) : (
          <p className="text-red-500 font-semibold">
            No se recibió el número de donación.
          </p>
        )}

        <Link
          href="/"
          className="inline-block bg-verdeClaro text-white px-5 py-2 mt-6 rounded-lg hover:bg-verdeOscuro transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
