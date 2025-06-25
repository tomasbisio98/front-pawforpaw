"use client";

import { useDashboardData } from "./useDashboardData";
import { Dog } from "lucide-react";

export default function TopFiveCard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <p className="text-gray-500 text-sm">Cargando top 5...</p>;
  if (error || !data) return <p className="text-red-500 text-sm">No se pudo cargar el top 5.</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-verdeSuave">
      <div className="flex items-center mb-4">
        <Dog className="w-6 h-6 text-verdeClaro mr-2" />
        <h2 className="text-xl font-semibold text-verdeOscuro tracking-tight">
          Top 5 Perritos Más Donados 🏆
        </h2>
      </div>

      <ul className="space-y-3">
        {data.topDonatedDogs.map((dog, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-blancoConVerde rounded-lg hover:bg-verdeSuave/30 transition"
          >
            <span className="font-medium text-verdeOscuro">
              {index + 1}. {dog.name}
            </span>
            <span className="text-sm text-gray-600">{dog.donations} donaciones</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
