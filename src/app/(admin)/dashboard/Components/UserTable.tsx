"use client";

import React, { useEffect, useState } from "react";
import { getUser2 } from "@/service/user";
import { IUsers2 } from "@/interface/IUsers2";
import { updateStatusUsuario } from "@/service/user";
import clsx from "clsx";

const UserTable = () => {
  const [usuarios, setUsuarios] = useState<IUsers2[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 10;

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

      await updateStatusUsuario(id, newStatus);

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
    <div className="min-h-screen bg-[#F2F2F0] p-6">
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-center bg-white rounded-lg shadow-md">
          <thead className="bg-[#2A5559] text-white font-semibold">
            <tr>
              <th className="p-3">Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Monto Donado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-100 text-gray-800">
                <td className="p-3">{u.name}</td>
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
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className={clsx(
                "px-3 py-1 rounded font-medium text-sm",
                paginaActual === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#2A5559] text-white hover:bg-[#1d3e3e]"
              )}
            >
              Anterior
            </button>

            <span className="text-[#2A5559] font-semibold text-sm">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              onClick={() =>
                setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaActual === totalPaginas}
              className={clsx(
                "px-3 py-1 rounded font-medium text-sm",
                paginaActual === totalPaginas
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#2A5559] text-white hover:bg-[#1d3e3e]"
              )}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
