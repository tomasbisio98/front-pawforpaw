'use client'
import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}recover/request-password`, {
        email,
      })
      setMessage(response.data.message || 'Revisa tu correo para continuar.')
      setError('')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al enviar solicitud')
      setMessage('')
    }
  }

  return (
    <div className="flex m-10 mb-28 items-center justify-center bg-blancoSuave font-nunito">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-negro">
        <div className="flex justify-center mb-6">
          <Image src="/paw2.png" alt="Logo Fundación" width={200} height={150} />
        </div>
        <h1 className="text-2xl font-bold text-verdeOscuro text-center mb-4">Recuperar contraseña</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-verdeClaro"
            placeholder="ejemplo@email.com"
            required
          />
          <button
            type="submit"
            className="w-full bg-verdeClaro text-white py-2 rounded hover:bg-verdeOscuro transition-colors"
          >
            Enviar enlace de recuperación
          </button>
        </form>
        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  )
}
