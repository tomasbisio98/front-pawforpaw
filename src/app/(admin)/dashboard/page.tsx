"use client";

import DashboardContent from "./Components/DashboardContent";
import TopFiveCard from "./Components/TopFiveCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F0] p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#2A5559]">
        Bienvenido/a al Panel de Administración
      </h1>

      {/* Sección de KPIs y Navegación */}
      <div className="w-full max-w-7xl">
        <DashboardContent />
      </div>

      {/* Sección inferior centrada para el Top 5 */}
      <div className="w-full max-w-xl mt-10">
        <TopFiveCard />
      </div>
    </div>
  );
}
