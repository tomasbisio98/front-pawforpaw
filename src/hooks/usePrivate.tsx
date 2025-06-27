/* eslint-disable react-hooks/exhaustive-deps */
// hooks/protection/usePrivate.ts
'use client'

import { useAuthContext } from "@/context/authContext"
import { routes } from "@/routes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Bloquea acceso a páginas privadas si no hay sesión.
 * Usar en /perfil, /mis-turnos, etc.
 */
const usePrivate = () => {
  const { isAuth } = useAuthContext()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuth === null) return
    if (!isAuth) {
      router.push(routes.AuthPage)
    } else {
      setLoading(false)
    }
  }, [isAuth])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-8 h-8 border-4 border-verdeOscuro border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return null
}

export default usePrivate
