/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';

const usePublic = () => {
  const { isAuth, user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth === null) return;

    if (isAuth) {
      if (user?.isAdmin) {
        router.replace(routes.Dashboard); // Admin al dashboard
      } else {
        router.replace(routes.inicio); // Usuario normal al inicio
      }
    } else {
      setLoading(false); // Puede ver la página pública
    }
  }, [isAuth, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-8 h-8 border-4 border-verdeOscuro border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return null;
};

export default usePublic;

