// src/components/AdminNavbar.tsx
"use client";
import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <nav className="w-full bg-[#2A5559] text-white p-4 flex items-center justify-between">
      <div className="text-xl font-bold">Panel Admin</div>
      <div className="hidden space-x-4 md:flex">
        <Link href="/dashboard" className="hover:text-[#B4D9C4]">
          Inicio
        </Link>
        <Link href="/dashboard/ediPerritos" className="hover:text-[#B4D9C4]">
          Perritos
        </Link>
<<<<<<< HEAD
        <Link href="/dashboard/" className="hover:text-[#B4D9C4]">
=======
        <Link href="/dashboard/ediProductos" className="hover:text-[#B4D9C4]">
>>>>>>> c5a7e977f495c7067bcde377cbf1a31f3a6f2e78
          Productos
        </Link>
        <Link href="/dashboard/solicitudes" className="hover:text-[#B4D9C4]">
          Solicitudes
        </Link>
      </div>
      <button className="md:hidden">
        <Menu />
      </button>
    </nav>
  );
};

export default AdminNavbar;
