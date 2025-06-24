"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { LogOut } from "lucide-react";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Aquí puedes limpiar auth, tokens, etc.
    console.log("Cerrando sesión...");
    router.push(routes.AuthPage); // Ajusta si usas otra ruta de login
  };
  return (
    <nav className="bg-[#2A5559] text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="text-xl font-bold tracking-wide">Admin PawForPaw</div>

      <div className="flex items-center gap-6 text-sm font-semibold">
        <Link href={routes.Dashboard} className="hover:text-[#B4D9C4]">
          Inicio
        </Link>
        <Link href={routes.perritoAdmin} className="hover:text-[#B4D9C4]">
          Perritos
        </Link>
        <Link href="/dashboard/ediProductos" className="hover:text-[#B4D9C4]">
          Productos </Link>
        <Link href={routes.donaciones} className="hover:text-[#B4D9C4]">
          Donaciones
        </Link>
        <Link href={routes.usuarios} className="hover:text-[#B4D9C4]">
          Usuarios
        </Link>

        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#B4D9C4] text-[#2A5559] flex items-center justify-center font-bold">
            A
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 transition hover:text-red-300"
            title="Cerrar sesión"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
