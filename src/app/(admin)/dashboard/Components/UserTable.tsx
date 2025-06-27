"use client";

import React, { useEffect, useState } from "react";
import { getUser2 } from "@/service/user";
import { IUsers2 } from "@/interface/IUsers2";
import { updateStatusUsuario } from "@/service/user";

const UserTable = () => {
  const [usuarios, setUsuarios] = useState<IUsers2[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 20;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUser2();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);


  const totalPaginas = Math.ceil(usuarios.length / itemsPorPagina);
  const usuariosPaginados = usuarios.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const toggleEstado = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;

      // 1. Actualiza en backend
      await updateStatusUsuario(id, newStatus);

      // 2. Refleja el cambio en frontend
      setUsuarios((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("No se pudo actualizar el estado del usuario.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-center bg-white rounded-lg shadow">
        <thead className="bg-[#D0CBC7] text-[#593723] font-semibold">
          <tr>
            <th className="p-2">Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Monto Donado</th>
          </tr>
        </thead>
        <tbody>
          {usuariosPaginados.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-100 text-gray-800">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={u.status}
                    onChange={() => toggleEstado(u.id, u.status)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 transition-colors duration-300" />
                  <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-5"></span>
                </label>
              </td>
              <td>S/ {u.montoDonado?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="text-center mt-4 text-[#2A5559] font-medium space-x-2">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={`px-2 ${paginaActual === i + 1 ? "underline font-bold" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        {paginaActual < totalPaginas && (
          <button
            onClick={() => setPaginaActual(paginaActual + 1)}
            className="underline"
          >
            siguiente &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default UserTable;
