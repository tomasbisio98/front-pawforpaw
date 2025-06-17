// src/app/(admin)/dashboard/page.tsx
import React from "react";
import AdminNavbar from "@/components/navbar/AdminNavbar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#F2F2F0]">
      <AdminNavbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold text-[#2A5559] mb-4">
          Bienvenido/a al Panel de Administración
        </h1>
        {/* Aquí luego irán las cards resumen */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 rounded-2xl shadow text-[#593723]">
            <h2 className="text-lg font-semibold">Total Perritos</h2>
            <p className="mt-2 text-3xl">12</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-[#593723]">
            <h2 className="text-lg font-semibold">Adoptados</h2>
            <p className="mt-2 text-3xl">7</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow text-[#593723]">
            <h2 className="text-lg font-semibold">Pendientes</h2>
            <p className="mt-2 text-3xl">5</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
