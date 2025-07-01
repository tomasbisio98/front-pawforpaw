"use client";

import useAdminOutOfPublic from "@/hooks/useAdminOutOfPublic";
import usePrivate from "@/hooks/usePrivate";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  
  const protection = useAdminOutOfPublic() // 🔐
    const loading = usePrivate();
    if (loading) return loading
  

  if (protection) return protection;

  return (
    <div className="min-h-screen bg-gradient-to-br from-verdeClaro via-blancoConVerde to-verdeSuave flex items-center justify-center px-4 font-nunito">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-marronOscuro mb-2">Pago cancelado</h1>
        <p className="text-gray-600 text-sm mb-4">
          Parece que cancelaste el proceso. Si fue un error, puedes intentarlo de nuevo.
        </p>

        <Link
          href="/"
          className="inline-block bg-verdeClaro text-white px-5 py-2 rounded-lg hover:bg-verdeOscuro transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
