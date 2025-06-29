import Link from 'next/link'
import ForgotPasswordPage from '../(single-page)/authpag/components/ForgotPasswordPage'
import { routes } from '@/routes'
import { FiArrowLeft } from 'react-icons/fi'

export default function ForgotPassword() {
  return(
      <main className="bg-blancoSuave p-2 pt-11 flex flex-col items-center">
  
  <div className="w-full max-w-6xl flex items-center justify-between mt-10">
    <Link
      href={routes.inicio}
      className="text-green-900 font-medium bg-verdeSuave rounded-md px-4 py-2 flex items-center gap-2"
    ><FiArrowLeft /> Regresar al Inicio
    </Link>
  </div>
  <ForgotPasswordPage />
    </main>
  ) 
}
