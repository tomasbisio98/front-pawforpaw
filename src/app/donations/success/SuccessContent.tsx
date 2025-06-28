"use client";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const donationId = searchParams.get("donationId");

  console.log("👉 donationId:", donationId); // 👈 esto debe mostrar algo

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded shadow">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">¡Gracias por tu donación!</h1>
        <p className="text-gray-600 mb-4">
          Tu apoyo es muy valioso para nosotros.
        </p>
        {donationId ? (
          <p className="text-gray-500">Número de referencia: {donationId}</p>
        ) : (
          <p className="text-red-500 font-semibold">
            No se recibió el número de donación.
          </p>
        )}
        <Link href="/" className="inline-block mt-4 text-blue-600 underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
