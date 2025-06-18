/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";
import { FiArrowLeft } from "react-icons/fi";
import { routes } from "@/routes";

const AuthPage = () => {
    return (
      <main className="min-h-screen bg-blancoSuave p-4 pt-11 flex flex-col items-center">
  
  <div className="w-full max-w-6xl flex items-center justify-between mb-8">

    <div className="flex items-center">
        <Link href={routes.inicio}>
            <img src="/paw.png" alt="Logo" className="h-12 w-auto rounded-full " />
        </Link>
    </div>

    <Link
      href={routes.inicio}
      className="text-green-900 font-medium bg-verdeSuave rounded-md px-4 py-2 flex items-center gap-2"
    ><FiArrowLeft /> Regresar al Inicio
    </Link>
  </div>

  {/* Contenedor central de los formularios */}
  <div className="bg-white p-8 rounded-2xl shadow-lg w-[80%] max-w-6xl flex flex-col md:flex-row items-start justify-center ">
    {/* Login Form */}
    <div className="flex-1 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-green-950 text-center mb-6">
        Iniciar Sesión
      </h2>
      <LoginForm />
    </div>
     
    {/* Register Form */}
    <div className="flex-1">
      <h2 className="text-3xl font-bold text-green-950 text-center mb-6">
        Crear Cuenta
      </h2>
      <RegisterForm />
    </div>
  </div>
</main>

   
  );
}

export default AuthPage;