"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuth } = useAuthContext();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth === null) return; // ⛔ No tomes decisiones hasta saber si hay sesión o no

    if (isAuth === false || !user) {
      router.push("/authpag");
    } else if (!user.isAdmin) {
      router.push("/");
    }

    setLoading(false); // Ya se evaluó, se puede mostrar o redirigir
  }, [isAuth, user, router]);

  if (loading) return null;

  return <>{children}</>;
};

export default AdminRoute;