import React from "react";
import TopFiveCard from "./Components/TopFiveCard";
import Breadcrumb from "@/app/(admin)/dashboard/Components/Breadcrumb";
import DashboardContent from "@/app/(admin)/dashboard/Components/DashboardContent";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F0] flex flex-col">
      {/* Navbar superior */}

      {/* Contenido principal con grid */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-6">
        {/* Contenido del dashboard */}
        <section className="w-full">

          <h1 className="text-2xl font-bold text-[#2A5559] mb-4 text-center">
            Bienvenido/a al Panel de Administración
          </h1>
          <Breadcrumb />
          <DashboardContent />

        </section>

        {/* Panel lateral con el ranking */}
        <aside className="w-full">
          <TopFiveCard />
        </aside>
      </main>
    </div>
  );
};

export default DashboardPage;
