"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { LogOut } from "lucide-react";
import { useAuthContext } from "@/context/authContext";

export default function AdminNavbar() {
  const router = useRouter();
  const { resetUserData } = useAuthContext();

  const handleLogout = () => {
    resetUserData();
    setTimeout(() => {
      router.push(routes.AuthPage);
    }, 500);
  };

  return (
    <nav className="bg-verdeOscuro px-6 py-4 shadow text-white">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Título */}
        <h1 className="text-2xl font-semibold tracking-wide uppercase">
          Admin PawForPaw
        </h1>

        {/* Navegación */}
        <div className="flex items-center gap-8 text-base font-medium">
          <Link href={routes.Dashboard} className="hover:text-verdeClaro transition-colors">
            Inicio
          </Link>
          <Link href={routes.perritoAdmin} className="hover:text-verdeClaro transition-colors">
            Perritos
          </Link>
          <Link href={routes.donaciones} className="hover:text-verdeClaro transition-colors">
            Donaciones
          </Link>
          <Link href={routes.usuarios} className="hover:text-verdeClaro transition-colors">
            Usuarios
          </Link>

          {/* Perfil + Logout */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-verdeClaro text-verdeOscuro flex items-center justify-center font-bold text-base">
              A
            </div>

            {/* Botón de salir */}
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="flex items-center gap-1 hover:text-red-300 transition-colors text-base"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
