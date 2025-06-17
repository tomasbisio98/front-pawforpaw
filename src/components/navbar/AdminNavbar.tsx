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
        <Link href="/dashboard/perritos" className="hover:text-[#B4D9C4]">
          Perritos
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
