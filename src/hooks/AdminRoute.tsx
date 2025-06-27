// hooks/protection/AdminRoute.tsx
'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/authContext"
import { routes } from "@/routes"

/**
 * Envuelve contenido solo visible para usuarios administradores.
 * Redirige a login si no hay sesión, o al home si no es admin.
 */
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuth } = useAuthContext()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuth === null) return

    if (!isAuth || !user) {
      router.push(routes.AuthPage)
      return
    }

    if (!user.isAdmin) {
      router.push(routes.inicio)
      return
    }

    setLoading(false)
  }, [isAuth, user])

  if (loading) return  <div className="flex items-center justify-center ">
        <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>

  return <>{children}</>
}

export default AdminRoute
