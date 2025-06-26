"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Search, Filter } from "lucide-react";
import axios from "axios";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  estado: boolean;
  montoDonado: number;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroVisible, setFiltroVisible] = useState(false);

  const itemsPorPagina = 5;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };

    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "" ||
      (filtroEstado === "Activo" && u.estado) ||
      (filtroEstado === "Inactivo" && !u.estado);

    return coincideBusqueda && coincideEstado;
  });

  const totalPaginas = Math.ceil(usuariosFiltrados.length / itemsPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
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
    <div className="min-h-screen bg-[#F2F2F0] p-6">
      <h1 className="mb-2 text-3xl font-bold text-center text-[#2A5559]">
        VISUALIZACIÓN DE USUARIOS
      </h1>
      <h2 className="mb-6 text-xl font-bold text-center text-[#2A5559]">
        Gestión de Usuarios
      </h2>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        {/* Filtro (Izquierda) */}
        <div className="relative">
          <button onClick={() => setFiltroVisible(!filtroVisible)}>
            <Filter className="w-6 h-6 text-[#2A5559]" />
          </button>

          {filtroVisible && (
            <div className="absolute left-0 z-10 w-40 p-2 mt-2 bg-white border rounded shadow-md">
              <label className="block text-sm mb-1 font-semibold text-[#2A5559]">
                Estado
              </label>
              <select
                className="w-full p-1 text-sm border rounded"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          )}
        </div>

        {/* Búsqueda (Derecha) */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar por nombre o email"
            className="w-full px-3 py-2 pl-10 border rounded-md"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Tabla */}
      <div className="text-2xl font-semibold mb-2 text-[#444]">
        TABLA DE USUARIOS / VISUALIZAR
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center bg-white rounded-lg shadow-md">
          <thead className="bg-[#2A5559] text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Monto donado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-100 text-black">
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
                    <div className={classNames(
                      "w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-[#33A69A] transition-colors relative"
                    )}>
                      <div className={classNames(
                        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                        { "translate-x-5": u.estado }
                      )} />
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
}
