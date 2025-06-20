"use client";

import React, { useState } from "react";
import { Pencil, PackageSearch } from "lucide-react";
import { routes } from "@/routes";
import Link from "next/link";

type Perrito = {
  id: number;
  nombre: string;
  imagen: string;
  genero: string;
  ciudad: string;
  descripcion: string;
  estado: string;
};

const mockPerritos: Perrito[] = [
  {
    id: 1,
    nombre: "Milka",
    imagen: "/milka.jpg",
    genero: "Hembra",
    ciudad: "Bogotá",
    descripcion: "Lorem ipsum",
    estado: "Activo",
  },
  // Puedes duplicar más objetos si quieres más perritos
];

export default function GestionPerritos() {
  const [perritos, setPerritos] = useState<Perrito[]>(mockPerritos);

  return (
    <div className="p-6 bg-[#F2F2F0] min-h-screen">
      <h2 className="mb-4 text-3xl font-bold text-center">
        Gestión de Perritos
      </h2>

      <div className="flex items-center justify-between mb-4">
        <Link
          href={routes.Ediperritos}
          className="bg-[#B4D9C4] text-[#2A5559] px-4 py-2 rounded-xl font-semibold hover:bg-[#A3CDB5] transition"
        >
          + Agregar perrito
        </Link>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-2 border rounded-lg"
          />
          <button className="p-2 border rounded-lg">A-Z</button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#33A69A] text-white">
            <th className="p-2">Nombre</th>
            <th className="p-2">Imagen</th>
            <th className="p-2">Género</th>
            <th className="p-2">Ciudad</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Editar</th>
            <th className="p-2">Productos</th>
          </tr>
        </thead>
        <tbody>
          {perritos.map((perrito) => (
            <tr key={perrito.id} className="text-center bg-white border-b">
              <td className="p-2">{perrito.nombre}</td>
              <td className="p-2">
                <img
                  src={perrito.imagen}
                  alt={perrito.nombre}
                  className="object-cover w-12 h-12 mx-auto rounded-full"
                />
              </td>
              <td className="p-2">{perrito.genero}</td>
              <td className="p-2">{perrito.ciudad}</td>
              <td className="p-2">{perrito.descripcion}</td>
              <td className="p-2">{perrito.estado}</td>
              <td className="p-2">
                <Link
                  href={routes.Ediperritos}
                  className="text-[#2A5559] hover:text-black"
                >
                  <Pencil size={20} />
                </Link>
              </td>
              <td className="p-2">
                <Link
                  href={routes.GestionProductos(p.id)}
                  className="text-[#2A5559] hover:text-black"
                >
                  <PackageSearch size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-center">
        {/* Paginación simple o futura */}
        Página 1
      </div>
    </div>
  );
}
