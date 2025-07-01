"use client";

import React, { useEffect, useState } from "react";
import { getUser2 } from "@/service/user";
import { IUsers2 } from "@/interface/IUsers2";
import { updateStatusUsuario } from "@/service/user";

const UserTable = () => {
  const [usuarios, setUsuarios] = useState<IUsers2[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina] = useState(15);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [status, setStatus] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await getUser2({
          page: paginaActual,
          limit: itemsPorPagina,
          orderBy,
          order,
          status: status || undefined,
        });

        console.log("📦 Datos recibidos:", res);
        setUsuarios(Array.isArray(res.data) ? res.data : []);
        setTotalUsuarios(res.total ?? 0);
      } catch (error) {
        console.error("❌ Error en fetchUsuarios:", error);
      }
    };

    fetchUsuarios();
  }, [paginaActual, itemsPorPagina, orderBy, order, status]);

  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const totalPaginas = Math.ceil(totalUsuarios / itemsPorPagina);

  const toggleEstado = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;

      await updateStatusUsuario(id, newStatus); // 🔧 Aquí estaba el error

      setUsuarios((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );

      const usuarioActualizado = usuarios.find((u) => u.id === id);
      if (usuarioActualizado) {
        setMensaje(
          `✅ El usuario ${usuarioActualizado.name} (${
            usuarioActualizado.email
          }) ha sido ${newStatus ? "activado" : "desactivado"}.`
        );

        setTimeout(() => setMensaje(""), 3750);
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("No se pudo actualizar el estado del usuario.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F0] px-3 py-1">
      <div className="overflow-x-auto">
        <div className="mb-3 flex flex-wrap gap-3 items-center justify-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-2 py-1.5 rounded w-44 text-sm text-gray-800"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border px-2 py-1.5 rounded w-44 text-sm text-gray-800"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            className="border px-2 py-1.5 rounded w-44 text-sm text-gray-800"
          >
            <option value="name">Nombre</option>
            <option value="email">Email</option>
            <option value="phone">Teléfono</option>
          </select>
        </div>
        <table className="w-full text-sm text-center bg-white rounded-lg shadow-md text-gray-800">
          <thead className="bg-[#2A5559] text-white font-semibold">
            <tr>
              <th className="p-3">Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(usuarios) && usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <label className="relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={u.status}
                        onChange={() => toggleEstado(u.id, u.status)}
                      />
                      {/* Fondo del switch */}
                      <div className="w-11 h-6 bg-[#e5e5ea] rounded-full peer-checked:bg-[#34c759] transition-colors duration-300 ease-in-out"></div>
                      {/* Círculo interior */}
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform peer-checked:translate-x-5"></div>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-gray-500">
                  No hay usuarios disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className={`px-3 py-1 rounded font-medium text-sm ${
                paginaActual === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#2A5559] text-white hover:bg-[#1d3e3e]"
              }`}
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
              className={`px-3 py-1 rounded font-medium text-sm ${
                paginaActual === totalPaginas
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#2A5559] text-white hover:bg-[#0e1313]"
              }`}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {mensaje && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#2A5559] text-white px-4 py-2 rounded shadow-lg text-sm transition-opacity duration-300">
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default UserTable;
