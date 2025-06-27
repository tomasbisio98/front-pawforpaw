/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useAuthContext } from "@/context/authContext"
import { routes } from "@/routes"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Hook para proteger rutas públicas de usuarios ya logueados
const usePublic = () => {
  const { isAuth } = useAuthContext()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuth === null) return // Esperamos saber si hay sesión

    if (isAuth) {
      router.push(routes.inicio)
    } else {
      setLoading(false) // Solo mostramos la página si no hay sesión
    }
  }, [isAuth])

  // Mientras se evalúa el estado de auth, mostramos cargando
  if (loading) {
    return  <div className="flex items-center justify-center ">
        <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  }

  return null
}

export default usePublic
