"use client";

import { useDashboardData } from "./useDashboardData";
import KPIBox from "./KPIBox";
import NavigationCards from "./NavigationCards";

export default function DashboardContent() {
  const { data, loading, error } = useDashboardData();

  if (loading)
    return (
      <p className="text-center text-[#2C5959] font-nunito text-lg">
        Cargando...
      </p>
    );
  if (error || !data)
    return (
      <p className="text-center text-red-600 font-nunito text-lg">
        Error al cargar datos.
      </p>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIBox title="Total Perritos" value={data.totalDogs} />
        <KPIBox title="Total Productos" value={data.totalProducts} />
        <KPIBox title="Total Donado" value={`$${data.totalDonations}`} />
        <KPIBox title="Total Usuarios" value={data.totalUsers} />
      </div>
      <NavigationCards />
    </div>
  );
}

