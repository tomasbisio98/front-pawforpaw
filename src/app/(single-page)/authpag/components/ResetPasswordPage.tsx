'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const { token } = useParams()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recover/reset-password`, {
        token,
        newPassword: password,
      })

      setMessage(response.data.message || 'Contraseña actualizada correctamente')
      setError('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al restablecer la contraseña')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blancoSuave font-nunito px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <Image src="/paw2.png" alt="Logo Fundación" width={200} height={150} />
        </div>

        <h2 className="text-2xl text-verdeOscuro font-bold text-center mb-6">
          Establecer nueva contraseña
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nueva contraseña
          </label>
          <input
            type="password"
            className="w-full p-2 border border-verdeClaro rounded focus:outline-none focus:ring-2 focus:ring-verdeClaro mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirmar contraseña
          </label>
          <input
            type="password"
            className="w-full p-2 border border-verdeClaro rounded focus:outline-none focus:ring-2 focus:ring-verdeClaro"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••"
            required
          />

          <button
            type="submit"
            className="w-full mt-6 bg-verdeClaro hover:bg-verdeOscuro text-white font-bold py-2 rounded transition"
          >
            Guardar nueva contraseña
          </button>
        </form>

        {/* MENSAJE DE ÉXITO */}
        {message && (
          <p className="mt-4 text-green-600 text-sm text-center">{message}</p>
        )}

        {/* MENSAJE DE ERROR */}
        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/authpag')}
            className="text-verdeClaro text-sm hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  )
}
