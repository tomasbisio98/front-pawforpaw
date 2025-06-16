/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";
import { FiArrowLeft } from "react-icons/fi";

const AuthPage = () => {
    return (
      <main className="min-h-screen bg-gray-200 p-4 pt-11 flex flex-col items-center">
  {/* Link a la derecha */}
  <div className="w-full max-w-6xl flex items-center justify-between mb-8">

    <div className="flex items-center">
        <img src="/paw.png" alt="Logo" className="h-12 w-auto rounded-md " />
    </div>

    <Link
      href="#"
      className="text-slate-800 font-medium bg-emerald-300 rounded-md px-4 py-2 flex items-center gap-2"
    ><FiArrowLeft /> Regresar al Inicio
    </Link>
  </div>

  {/* Contenedor central de los formularios */}
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl flex flex-col md:flex-row items-start justify-center gap-12">
    {/* Login Form */}
    <div className="flex-1 min-w-[280px]">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Iniciar Sesión
      </h2>
      <LoginForm />
    </div>

    {/* Register Form */}
    <div className="flex-1 min-w-[280px]">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Crear Cuenta
      </h2>
      <RegisterForm />
    </div>
  </div>
</main>

   
  );
}

export default AuthPage;