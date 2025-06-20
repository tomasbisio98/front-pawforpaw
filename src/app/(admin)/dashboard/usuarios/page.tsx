"use client";

import React, { useState } from "react";
import classNames from "classnames";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  estado: boolean;
  montoDonado: number;
}

const mockUsuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Maximiliano",
    email: "maxi@gmail.com",
    estado: true,
    montoDonado: 500,
  },
  {
    id: 2,
    nombre: "Mariana",
    email: "mari@gmail.com",
    estado: false,
    montoDonado: 1500,
  },
  {
    id: 3,
    nombre: "Maximiliano",
    email: "maxi@gmail.com",
    estado: true,
    montoDonado: 500,
  },
  {
    id: 4,
    nombre: "Maximiliano",
    email: "maxi@gmail.com",
    estado: false,
    montoDonado: 1500,
  },
  {
    id: 5,
    nombre: "Maximiliano",
    email: "maxi@gmail.com",
    estado: true,
    montoDonado: 500,
  },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  const totalPaginas = Math.ceil(usuarios.length / itemsPorPagina);
  const usuariosPaginados = usuarios.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const toggleEstado = (id: number) => {
    setUsuarios((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, estado: !user.estado } : user
      )
    );
  };

  return (
    <div className="p-6 bg-[#F2F2F0] min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#2A5559] mb-4">
        USUARIOS
      </h1>

      <div className="mb-8 text-2xl font-semibold text-center text-gray-600">
        GESTIÓN DE USUARIOS
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center bg-white rounded-lg shadow">
          <thead className="bg-[#D0CBC7] text-[#593723] font-semibold">
            <tr>
              <th className="p-2">Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Monto donado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-100">
                <td className="p-2">{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={u.estado}
                      onChange={() => toggleEstado(u.id)}
                      className="sr-only peer"
                    />
                    <div
                      className={classNames(
                        "w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#33A69A] transition-colors relative"
                      )}
                    >
                      <div
                        className={classNames(
                          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                          { "translate-x-5": u.estado }
                        )}
                      />
                    </div>
                  </label>
                </td>
                <td className="font-medium text-[#2A5559]">
                  S/ {u.montoDonado.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="text-center mt-6 text-[#2A5559] font-medium space-x-2">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={`px-2 ${
              paginaActual === i + 1 ? "underline font-bold" : ""
            }`}
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
}
