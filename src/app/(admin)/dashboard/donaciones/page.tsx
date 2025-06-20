"use client";

import React, { useState } from "react";

interface Donacion {
  id: number;
  usuario: string;
  producto: string;
  perrito: string;
  monto: number;
  fecha: string;
  estado: string;
}

const estadosOpciones = ["exitoso", "fallido", "en proceso", "bloqueado"];

const estilosEstado: Record<string, string> = {
  exitoso: "bg-green-100 text-green-700",
  fallido: "bg-red-100 text-red-700",
  "en proceso": "bg-yellow-100 text-yellow-700",
  bloqueado: "bg-gray-100 text-gray-700",
};

// Donaciones de prueba con ID
const mockDonaciones: Donacion[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  usuario: "Maximiliano",
  producto: "Cama",
  perrito: "Milka",
  monto: 500.0,
  fecha: "10/06/2025",
  estado: estadosOpciones[Math.floor(Math.random() * estadosOpciones.length)],
}));

export default function DonacionesPage() {
  const [donaciones, setDonaciones] = useState<Donacion[]>(mockDonaciones);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  const totalPaginas = Math.ceil(donaciones.length / itemsPorPagina);
  const donacionesPaginadas = donaciones.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  const handleEstadoChange = (id: number, nuevoEstado: string) => {
    setDonaciones((prev) =>
      prev.map((d) => (d.id === id ? { ...d, estado: nuevoEstado } : d))
    );
  };

  return (
    <div className="p-6 bg-[#F2F2F0] min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#2A5559] mb-2">
        Donaciones
      </h1>
      <div className="mb-8 text-xl font-semibold text-center text-gray-600">
        HISTORIAL DE DONACIONES
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-lg shadow">
          <thead className="bg-gray-300 text-[#2A5559] font-semibold">
            <tr>
              <th className="p-2">Usuario</th>
              <th>Producto</th>
              <th>Perrito</th>
              <th>Monto S/</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {donacionesPaginadas.map((d) => (
              <tr key={d.id} className="text-center border-t hover:bg-gray-100">
                <td className="p-2">{d.usuario}</td>
                <td>{d.producto}</td>
                <td>{d.perrito}</td>
                <td>{d.monto.toFixed(2)}</td>
                <td>{d.fecha}</td>
                <td className="p-1">
                  <select
                    value={d.estado}
                    onChange={(e) => handleEstadoChange(d.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${estilosEstado[d.estado]}`}
                  >
                    {estadosOpciones.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
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
