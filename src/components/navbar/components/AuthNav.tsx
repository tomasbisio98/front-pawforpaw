"use client";

import { routes } from "@/routes";
import NavList from "./NavList";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import Image from "next/image";

const AuthNav = () => {
  const { isAuth, user, resetUserData } = useAuthContext();

  const logoutAction = () => {
    resetUserData();
    setTimeout(() => {
      location.assign(routes.inicio);
    }, 500);
  };

  if (isAuth === null) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuth && user) {
    return (
      <div className="flex items-center space-x-3">
        <Link
          href={routes.DashboardUser}
          className="text-white flex items-center space-x-2 hover:text-verdeSuave transition px-3"
        >
          {user?.profileImgUrl ? (
            <div className="w-9 h-9 relative rounded-full overflow-hidden border border-white">
              <Image
                src={user.profileImgUrl}
                alt="Foto de perfil"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-white text-center text-sm font-bold text-marronOscuro flex items-center justify-center">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}

          <span>{user.name}</span>
        </Link>

        <p
          onClick={logoutAction}
          role="button"
          className="text-red-600 hover:text-red-800 transition"
        >
          Cerrar sesión
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 list-none px-6">
      <NavList href={routes.AuthPage} name="Iniciar Sesión" />
      <NavList href={routes.AuthPage} name="Registro" />
    </div>
  );
};

export default AuthNav;
