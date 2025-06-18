import React from "react";
import { Gift, Dog, Users, DollarSign } from "lucide-react";

const kpis = [
  {
    icon: <Dog className="text-[#33A69A]" />,
    label: "Perritos",
    value: 12,
  },
  {
    icon: <Gift className="text-[#33A69A]" />,
    label: "Productos",
    value: 12,
  },
  {
    icon: <DollarSign className="text-[#33A69A]" />,
    label: "Donado",
    value: "$52.000",
  },
  {
    icon: <Users className="text-[#33A69A]" />,
    label: "Usuarios",
    value: 89,
  },
];

const DashboardContent = () => {
  return (
    <div>
      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2A5559] mb-8">
        Panel de Administracion de la Fundacion
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-[#FAF6FF] rounded-xl p-4 flex items-center justify-between shadow-sm border border-[#EDEDED]"
          >
            <div className="flex flex-col">
              <span className="text-[#593723] text-sm font-semibold">
                {kpi.label}
              </span>
              <span className="text-xl font-bold text-[#2A5559]">
                {kpi.value}
              </span>
            </div>
            <div className="bg-[#E4F5F2] p-2 rounded-full">{kpi.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
