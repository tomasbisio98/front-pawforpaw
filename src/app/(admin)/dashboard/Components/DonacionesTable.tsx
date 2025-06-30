"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter } from "lucide-react";
import clsx from "clsx";

interface Donacion {
  id: string;
  usuario: string;
  producto: string;
  perrito: string;
  monto: number;
  fecha: string;
  estado: string;
}

const estadosOpciones = ["exitoso", "fallido", "en proceso", "bloqueado"];

export default function DonacionesHistorial() {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroVisible, setFiltroVisible] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [ordenFechaDesc, setOrdenFechaDesc] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10; // Puedes ajustar esto

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/donations/historial`
        );
        setDonaciones(response.data);
      } catch (error) {
        console.error("Error al obtener historial de donaciones", error);
      }
    };
    fetchHistorial();
  }, []);

  const donacionesFiltradas = donaciones.filter(
    (d) =>
      d.usuario.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtroEstado === "" || d.estado === filtroEstado)
  );

  const ordenarPorFecha = () => {
    const sorted = [...donacionesFiltradas].sort((a, b) => {
      const fechaA = new Date(a.fecha).getTime();
      const fechaB = new Date(b.fecha).getTime();
      return ordenFechaDesc ? fechaB - fechaA : fechaA - fechaB;
    });
    setOrdenFechaDesc(!ordenFechaDesc);
    setDonaciones(sorted); // Esto modifica el orden en pantalla
  };

  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const indiceFin = indiceInicio + filasPorPagina;
  const donacionesPaginadas = donacionesFiltradas.slice(
    indiceInicio,
    indiceFin
  );
  const totalPaginas = Math.ceil(donacionesFiltradas.length / filasPorPagina);

  return (
    <div className="min-h-screen bg-[#F2F2F0] p-6">
      <h1 className="mb-2 text-3xl font-bold text-center text-[#2A5559]">
        VISUALIZACIÓN DE DONACIONES
      </h1>
      <h2 className="mb-6 text-xl font-bold text-center text-[#2A5559]">
        Historial de Donaciones
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
                {estadosOpciones.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Búsqueda (Derecha) */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar por usuario"
            className="w-full px-3 py-2 pl-10 border rounded-md"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>
      {/* Tabla */}
      <div className="text-2xl font-semibold mb-2 text-[#444]">
        TABLA DE DONACIONES / VISUALIZAR
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center bg-white rounded-lg shadow-md">
          <thead className="bg-[#2A5559] text-white">
            <tr>
              <th className="p-2">Usuario</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Perrito</th>
              <th className="p-2">Monto</th>
              <th
                className="p-2 cursor-pointer hover:underline"
                onClick={ordenarPorFecha}
              >
                Fecha {ordenFechaDesc ? "↓" : "↑"}
              </th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {donacionesPaginadas.map((d) => (
              <tr
                key={d.id}
                className="border-t hover:bg-gray-100 text-black text-center"
              >
                <td className="p-2">{d.usuario}</td>
                <td className="p-2">{d.producto}</td>
                <td className="p-2">{d.perrito}</td>
                <td className="p-2">{d.monto.toFixed(2)}</td>
                <td className="p-2">{d.fecha}</td>
                <td className="p-2">
                  <span
                    className={clsx(
                      "text-sm font-semibold px-2 py-1 rounded-full",
                      {
                        "bg-green-100 text-green-700":
                          d.estado.toLowerCase() === "Exitoso",
                        "bg-red-100 text-red-700":
                          d.estado.toLowerCase() === "Fallido",
                        "bg-yellow-100 text-yellow-700":
                          d.estado.toLowerCase() === "En proceso",
                        "bg-gray-100 text-gray-700":
                          d.estado.toLowerCase() === "Bloqueado",
                        "bg-gray-200 text-gray-800": ![
                          "Exitoso",
                          "Fallido",
                          "En proceso",
                          "Bloqueado",
                        ].includes(d.estado.toLowerCase()),
                      }
                    )}
                  >
                    {d.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-40 flex justify-center">
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
}
