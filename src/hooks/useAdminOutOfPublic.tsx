/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';
import { routes } from '@/routes';

/**
 * Solo permite usuarios normales o sin sesión.
 * Admin logueado será redirigido al dashboard.
 */
const useAdminOutOfPublic = () => {
  const { isAuth, user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth === null) return;

    if (isAuth && user?.isAdmin) {
      router.replace(routes.Dashboard);
    } else {
      setLoading(false);
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

export default useAdminOutOfPublic;
