/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Edit, Package } from "lucide-react";
import { routes } from "@/routes";
import Link from "next/link";
import { createDog, getDogsFilter, updateDog } from "@/service/dogs";
import { DogFormData, IDogs } from "@/interface/IDogs";
import { toast } from 'react-toastify';

export default function AdminPerritos() {
  const [perritos, setPerritos] = useState<{ data: IDogs[]; total: number }>({
    data: [],
    total: 0,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [editando, setEditando] = useState<IDogs | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroVisible, setFiltroVisible] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");
  const esUrlImagen = (url: string): boolean => {
    return /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(url);
  };

  const validarImagen = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const [form, setForm] = useState<DogFormData>({
    name: "",
    sex: "",
    city: "",
    description: "",
    imgUrl: "",
    status: false,
  });

  useEffect(() => {
    const fetchPerritos = async () => {
      const response = await getDogsFilter({ page, limit });
      setPerritos(response); // 👈 ya no es necesario extraer .data, se guarda todo
    };

    fetchPerritos();
  }, [page, limit]);

  const abrirModal = (perrito?: IDogs) => {
    if (perrito) {
      setEditando(perrito);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { dogId, ...resto } = perrito;
      setForm(resto);
    } else {
      setEditando(null);
      setForm({
        name: "",
        sex: "",
        city: "",
        description: "",
        imgUrl: "",
        status: false,
      });
    }
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEditando(null);
  };

  const guardarPerrito = async () => {
    try {
      if (!esUrlImagen(form.imgUrl)) {
        toast.error(" La URL debe terminar en .jpg, .png, .webp, etc.");
        return;
      }

      const esValida = await validarImagen(form.imgUrl);
      if (!esValida) {
        toast.error(" La imagen no se pudo cargar. Revisa la URL.");
        return;
      }

      if (editando && typeof editando.dogId === 'string') {
        const actualizado = await updateDog(editando.dogId, form);
        if (!actualizado) throw new Error('No se pudo actualizar el perrito.');
        toast.success(" El perrito fue actualizado correctamente.");
      } else {
        const creado = await createDog(form);
        if (!creado) throw new Error('No se pudo crear el perrito.');
        toast.success(" El perrito fue creado correctamente.");
      }

      const perritosActualizados = await getDogsFilter();
      setPerritos(perritosActualizados);

      cerrarModal();
    } catch (error) {
      console.error(' Error al guardar el perrito:', error);
      toast.error(' Ocurrió un error al guardar el perrito. Revisa la consola.');
    }
  };


  // const eliminarPerrito = async (id: string) => {
  //   const confirmado = window.confirm("¿Estás seguro de que querés eliminar este perrito?");
  //   if (!confirmado) return;

  //   const eliminado = await deleteDog(id);
  //   if (eliminado) {
  //     const actualizados = await getDogs();
  //     setPerritos(actualizados);
  //   } else {
  //     alert("❌ No se pudo eliminar el perrito. Revisá la consola.");
  //   }
  // };

  const perritosFiltrados = (perritos.data ?? []).filter(p =>
    p.name.toLowerCase().includes(busqueda.toLowerCase()) &&
    (filtroEstado === "" || (p.status ? "Activo" : "Inactivo") === filtroEstado)
  );


  return (
    <div className="min-h-screen bg-[#F2F2F0] p-6">
      <h1 className="mb-2 text-3xl font-bold text-center text-[#2A5559]">
        VISUALIZACIÓN DE PERRITOS
      </h1>
      <h2 className="mb-6 text-xl font-bold text-center text-[#2A5559]">
        Gestión de perritos
      </h2>

      {/* Botones y filtros */}
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

      {/* Tabla */}
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
              {/* <th className="p-2">Eliminar</th> */}
            </tr>
          </thead>
          <tbody>
            {perritosFiltrados.map((p) => (
              <tr key={p.dogId} className="border-t hover:bg-gray-100">
                <td className="p-2 text-black">{p.name}</td>
                <td className="p-2">
                  <img
                    src={p.imgUrl}
                    alt={p.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover"
                    onError={(e) =>
                    (e.currentTarget.src =
                      "https://img.freepik.com/vector-gratis/sello-textura-huellas-patas_78370-2951.jpg?semt=ais_hybrid&w=740")
                    }
                  />
                </td>
                <td className="p-2 text-black">{p.sex === "H" ? "Hembra" : "Macho"}</td>
                <td className="p-2 text-black">{p.city}</td>
                <td className="p-2 text-black">{p.description}</td>
                <td className="p-2 text-black">{p.status ? "Activo" : "Inactivo"}</td>
                <td className="p-2">
                  <button onClick={() => abrirModal(p)}>
                    <Edit className="w-5 h-5 text-[#2A5559]" />
                  </button>
                </td>
                <td className="p-2">
                  <Link
                    href={routes.gestionProductos(p.dogId!)}
                    className="text-[#2A5559] hover:text-black"
                  >
                    <Package className="w-5 h-5 text-[#2A5559]" />
                  </Link>
                </td>
                {/* <td className="p-2">
                  <button onClick={() => eliminarPerrito(p.dogId!)} className="text-red-600 hover:text-red-800">
                    🗑️
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-md text-white font-semibold transition ${page === 1
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#B4D9C4] hover:bg-[#9fceb3] cursor-pointer'
            }`}
        >
          ← Anterior
        </button>

        <span className="text-lg font-medium text-gray-700">
          Página {page} de {Math.ceil(perritos.total / limit)}
        </span>

        <button
          onClick={() => {
            const totalPages = Math.ceil(perritos.total / limit);
            if (page < totalPages) setPage((prev) => prev + 1);
          }}
          disabled={page >= Math.ceil(perritos.total / limit)}
          className={`px-5 py-2 rounded-md text-white font-semibold transition ${page >= Math.ceil(perritos.total / limit)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#B4D9C4] hover:bg-[#9fceb3] cursor-pointer'
            }`}
        >
          Siguiente →
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-center text-[#2A5559]">
              {editando ? "Editar Perrito" : "Agregar Perrito"}
            </h3>

            <div className="space-y-3 text-black">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-2 border rounded-md"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Imagen URL"
                className="w-full p-2 border rounded-md"
                value={form.imgUrl}
                onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
              />
              <input
                type="text"
                placeholder="Sexo (M/H)"
                className="w-full p-2 border rounded-md"
                value={form.sex}
                onChange={(e) => setForm({ ...form, sex: e.target.value })}
              />
              <input
                type="text"
                placeholder="Ciudad"
                className="w-full p-2 border rounded-md"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Descripción"
                className="w-full p-2 border rounded-md"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <select
                className="w-full p-2 border rounded-md"
                value={form.status ? "Activo" : "Inactivo"}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value === "Activo" })
                }
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>

              {/* Botones modal */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={guardarPerrito}
                  className="bg-[#B4D9C4] px-4 py-2 rounded-md text-white"
                >
                  Guardar
                </button>
                <button
                  onClick={cerrarModal}
                  className="bg-[#F2F2F0] px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>

              {/* {editando && (
                <button
                  onClick={() => eliminarPerrito(editando.dogId!)}
                  className="w-full py-2 mt-3 text-white bg-red-400 rounded-md"
                >
                  Eliminar
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
