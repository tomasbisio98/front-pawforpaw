/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { routes } from "@/routes";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuth } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si aún no sabemos si hay sesión, esperamos
    if (isAuth === null) return;

    // Si no hay sesión, redirigimos al login
    if (!isAuth || !user) {
      router.replace(routes.AuthPage);
      return;
    }

    // Si hay sesión pero no es admin, lo echamos al inicio
    if (!user.isAdmin) {
      router.replace(routes.inicio);
      return;
    }

    // Si todo bien, dejamos de cargar
    setLoading(false);
  }, [isAuth, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-verdeOscuro border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;


