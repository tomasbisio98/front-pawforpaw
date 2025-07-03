"use client";

import { useDashboardData } from "./useDashboardData";
import KPIBox from "./KPIBox";
import NavigationCards from "./NavigationCards";
import { PawPrint, Users, Package, DollarSign } from "lucide-react";

export default function DashboardContent() {
  const { data, loading, error } = useDashboardData();

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <p className="text-center text-verdeOscuro font-nunito text-lg animate-pulse">
          Cargando panel...
        </p>
      </div>
    );

  if (error || !data)
    return (
      <div className="flex justify-center py-10">
        <p className="text-center text-red-600 font-nunito text-lg">
          Error al cargar los datos.
        </p>
      </div>
    );

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox
          title="Total Perritos"
          value={data.totalDogs}
          icon={<PawPrint size={20} className="text-[#1B9780]" />}
        />

        <KPIBox
          title="Total Productos"
          value={data.totalProducts}
          icon={<Package size={20} className="text-[#1B9780]" />}
        />

        <KPIBox
          title="Total Donado"
          value={`$${data.totalDonations}`}
          icon={<DollarSign size={20} className="text-[#1B9780]" />}
        />

        <KPIBox
          title="Total Usuarios"
          value={data.totalUsers}
          icon={<Users size={20} className="text-[#1B9780]" />}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-verdeOscuro mb-3 font-nunito">
          Accesos rápidos
        </h2>
        <NavigationCards />
      </div>
    </div>
  );
}
