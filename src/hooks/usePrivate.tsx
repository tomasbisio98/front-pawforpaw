'use client';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';
import { useEffect, useState } from 'react';

/**
 * Hook que protege páginas solo visibles para usuarios logueados normales (no admins).
 * Redirige según el estado y devuelve `true` si está cargando.
 */
const usePrivate = () => {
  const { isAuth, user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth === null) return; // Aún cargando auth

    if (!isAuth || !user) {
      router.replace(routes.AuthPage); // No logueado
    } else if (user.isAdmin) {
      router.replace(routes.Dashboard); // Admin
    } else {
      setLoading(false); // Usuario normal: ok
    }
  }, [isAuth, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-verdeOscuro border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
};

export default usePrivate;
