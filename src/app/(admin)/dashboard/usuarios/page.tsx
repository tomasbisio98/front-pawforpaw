import React from "react";
import UserTable from "@/app/(admin)/dashboard/Components/UserTable";

export default function UsuariosPage() {
  return (
    <div className="p-6 bg-[#F2F2F0] min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#2A5559] mb-4">USUARIOS</h1>
      <div className="mb-8 text-2xl font-semibold text-center text-gray-600">
        GESTIÓN DE USUARIOS
      </div>
      <UserTable />
    </div>
  );
}
