'use client'
import { useAuthContext } from "@/context/authContext";
import { FaEdit, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";


const UserDataUI = ()=>{
    const {user} = useAuthContext();

    if(!user){
        return null;
    }

    return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 dark:bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 shadow-md rounded-2xl p-6 mt-10 space-y-6">
        <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
          🧑‍💼 Perfil de Usuario
        </h2>

        {/* Nombre */}
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-zinc-700 pb-2">
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500" />
            <span className="text-lg text-zinc-800 dark:text-white">{user.name}</span>
          </div>
          <FaEdit className="text-gray-400 hover:text-blue-500 cursor-pointer" title="Editar nombre" />
        </div>

        {/* Teléfono */}
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-zinc-700 pb-2">
          <div className="flex items-center gap-3">
            <FaPhone className="text-green-500" />
            <span className="text-lg text-zinc-800 dark:text-white">{user.phone}</span>
          </div>
          <FaEdit className="text-gray-400 hover:text-green-500 cursor-pointer" title="Editar teléfono" />
        </div>

        {/* Email (no editable) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500" />
            <span className="text-lg text-zinc-500 dark:text-gray-400">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
    )
}
export default UserDataUI;