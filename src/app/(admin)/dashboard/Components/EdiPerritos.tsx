/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Search, Filter, Edit, Package } from "lucide-react";
import { routes } from "@/routes";
import Link from "next/link";

interface Perrito {
  id: number;
  nombre: string;
  imagen: string;
  genero: string;
  ciudad: string;
  descripcion: string;
  estado: string;
}

const mockPerritos: Perrito[] = [
  {
    id: 1,
    nombre: "Milka",
    imagen: "https://placedog.net/200/200?id=1",
    genero: "Hembra",
    ciudad: "Bogotá",
    descripcion: "Lorem ipsum",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Firulais",
    imagen: "https://placedog.net/200/200?id=2",
    genero: "Macho",
    ciudad: "Lima",
    descripcion: "Lorem ipsum",
    estado: "Inactivo",
  },
];

export default function AdminPerritos() {
  const [perritos, setPerritos] = useState<Perrito[]>(mockPerritos);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<Perrito | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroVisible, setFiltroVisible] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");

  const [form, setForm] = useState<Perrito>({
    id: 0,
    nombre: "",
    imagen: "",
    genero: "",
    ciudad: "",
    descripcion: "",
    estado: "",
  });

  const abrirModal = (perrito?: Perrito) => {
    if (perrito) {
      setEditando(perrito);
      setForm(perrito);
    } else {
      setEditando(null);
      setForm({
        id: 0,
        nombre: "",
        imagen: "",
        genero: "",
        ciudad: "",
        descripcion: "",
        estado: "",
      });
    }
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEditando(null);
  };

  const guardarPerrito = () => {
    if (editando) {
      setPerritos(perritos.map((p) => (p.id === editando.id ? form : p)));
    } else {
      setPerritos([...perritos, { ...form, id: Date.now() }]);
    }
    cerrarModal();
  };

  const eliminarPerrito = (id: number) => {
    setPerritos(perritos.filter((p) => p.id !== id));
    cerrarModal();
  };

  const perritosFiltrados = perritos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtroEstado === "" || p.estado === filtroEstado)
  );

  return (
    <div className="min-h-screen bg-[#F2F2F0] p-6">
      <h1 className="mb-2 text-3xl font-bold text-center text-[#2A5559]">
        VISUALIZACIÓN DE PERRITOS
      </h1>
      <h2 className="mb-6 text-xl font-bold text-center text-[#2A5559]">
        Gestión de perritos
      </h2>

      <div className="flex flex-col items-center justify-between gap-3 mb-4 sm:flex-row">
        <button
          onClick={() => abrirModal()}
          className="bg-[#B4D9C4] px-4 py-2 rounded-md font-semibold text-[#2A5559]"
        >
          + Agregar perrito
        </button>

        <div className="relative flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="px-3 py-2 pl-10 border rounded-md"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <button onClick={() => setFiltroVisible(!filtroVisible)}>
              <Filter className="w-6 h-6 text-[#2A5559]" />
            </button>

            {filtroVisible && (
              <div className="absolute right-0 z-10 w-40 p-2 mt-2 bg-white border rounded shadow-md">
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
        </div>
      </div>

      <div className="text-2xl font-semibold mb-2 text-[#444]">
        TABLA DE PERRITOS / VISUALIZAR
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white rounded-lg shadow-md">
          <thead className="bg-[#2A5559] text-white">
            <tr>
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
            {perritosFiltrados.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-100">
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="p-2">{p.genero}</td>
                <td className="p-2">{p.ciudad}</td>
                <td className="p-2">{p.descripcion}</td>
                <td className="p-2">{p.estado}</td>
                <td className="p-2">
                  <button onClick={() => abrirModal(p)}>
                    <Edit className="w-5 h-5 text-[#2A5559]" />
                  </button>
                </td>
                <td className="p-2">
                  <Link
                    href={routes.GestionProductos(p.id)}
                    className="text-[#2A5559] hover:text-black"
                  >
                    <Package className="w-5 h-5 text-[#2A5559]" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-center text-[#2A5559]">
              {editando ? "Editar Perrito" : "Agregar Perrito"}
            </h3>

            <div className="space-y-3">
              {["nombre", "imagen", "genero", "ciudad", "descripcion", "estado"].map((campo) => (
                <input
                  key={campo}
                  type="text"
                  name={campo}
                  placeholder={campo}
                  className="w-full p-2 border rounded-md"
                  value={(form as any)[campo]}
                  onChange={(e) =>
                    setForm({ ...form, [campo]: e.target.value })
                  }
                />
              ))}

              <div className="flex justify-between mt-4">
                <button
                  onClick={guardarPerrito}
                  className="bg-[#aab9f0] px-4 py-2 rounded-md text-white"
                >
                  Guardar
                </button>
                <button
                  onClick={cerrarModal}
                  className="bg-[#fce9b6] px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>

              {editando && (
                <button
                  onClick={() => eliminarPerrito(editando.id)}
                  className="w-full py-2 mt-3 text-white bg-red-400 rounded-md"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

