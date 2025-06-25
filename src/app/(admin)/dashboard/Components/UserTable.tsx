"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/service/user";
import { IUser } from "@/interface/IUsers";

const UserTable = () => {
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUser();
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
            <tr key={u.id} className="border-t hover:bg-gray-100">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.estado ? "Activo" : "Bloqueado"}</td>
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
