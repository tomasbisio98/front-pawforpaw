/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Edit, Package } from "lucide-react";
import { routes } from "@/routes";
import Link from "next/link";
import { createDog, getDogsFilter, updateDog } from "@/service/dogs";
import { DogFormData, IDogs } from "@/interface/IDogs";
import { toast } from "react-toastify";

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
  const [imagenFile, setImagenFile] = useState<File | null>(null);

  const [form, setForm] = useState<DogFormData>({
    name: "",
    sex: "",
    city: "",
    description: "",
    imgUrl: "", // <--- Agrega esto
    status: false,
  });

  useEffect(() => {
    const fetchPerritos = async () => {
      const response = await getDogsFilter({ page, limit });
      setPerritos(response);
    };
    fetchPerritos();
  }, [page, limit]);

  const abrirModal = (perrito?: IDogs) => {
    if (perrito) {
      setEditando(perrito);
      setForm({ ...perrito });
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
    setImagenFile(null);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setEditando(null);
  };

  const guardarPerrito = async () => {
    try {
      if (form.sex !== "H" && form.sex !== "M") {
        toast.error("El sexo debe ser 'H' (Hembra) o 'M' (Macho).");
        return;
      }

      // EDITAR
      if (editando && typeof editando.dogId === "string") {
        const updatePayload = {
          name: form.name,
          sex: form.sex,
          city: form.city,
          description: form.description,
          status: typeof form.status === "boolean" ? form.status : undefined,
          imgUrl:
            typeof form.imgUrl === "string" && form.imgUrl.startsWith("http")
              ? form.imgUrl
              : undefined,
        };

        console.log("📤 Payload UPDATE sin imagen nueva:", updatePayload);
        await updateDog(editando.dogId, updatePayload);
        toast.success("Perrito actualizado correctamente.");

        if (imagenFile) {
          const formData = new FormData();
          formData.append("file", imagenFile);

          if (!imagenFile || imagenFile.size === 0) {
            toast.error("La imagen seleccionada está vacía o es inválida.");
            return;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}file/uploadDogImage/${editando.dogId}`,
            { method: "POST", body: formData }
          );

          const data = await res.json();

          const updatePayload = {
            name: form.name,
            sex: form.sex,
            city: form.city,
            description: form.description,
            status: form.status,
            imgUrl: data.imageUrl?.startsWith("blob:")
              ? undefined
              : data.imageUrl,
          };

          console.log("📤 Payload UPDATE con imagen:", updatePayload);
          await updateDog(editando.dogId, updatePayload);
          setForm((prev) => ({ ...prev, imgUrl: data.imageUrl }));
          toast.success("Imagen actualizada");
        }
      } else {
        // CREAR
        const payload = { ...form };
        if (!payload.imgUrl || payload.imgUrl.startsWith("blob:")) {
          delete payload.imgUrl;
        }

        console.log("🐶 Payload que se enviará al backend:", payload);
        const nuevoPerrito = await createDog(payload);
        console.log("🐶 Perrito creado:", nuevoPerrito);

        if (!nuevoPerrito?.dogId) {
          toast.error("No se pudo obtener el ID del nuevo perrito.");
          return;
        }

        if (imagenFile) {
          const formData = new FormData();
          formData.append("file", imagenFile);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}file/uploadDogImage/${nuevoPerrito.dogId}`,
            { method: "POST", body: formData }
          );
          const data = await res.json();

          const updatePayload = {
            name: form.name,
            sex: form.sex,
            city: form.city,
            description: form.description,
            status: form.status,
            imgUrl: data.imageUrl?.startsWith("blob:")
              ? undefined
              : data.imageUrl,
          };

          console.log("📤 Payload UPDATE luego de imagen:", updatePayload);
          await updateDog(nuevoPerrito.dogId, updatePayload);
          setForm((prev) => ({ ...prev, imgUrl: data.imageUrl }));
          toast.success("Imagen subida con éxito");
        }
      }

      const perritosActualizados = await getDogsFilter({ page, limit });
      setPerritos(perritosActualizados);
      cerrarModal();
      setImagenFile(null);
    } catch (error) {
      console.error("❌ Error al guardar el perrito:", error);
      toast.error("Ocurrió un error. Revisa la consola.");
    }
  };

  const perritosFiltrados = perritos.data.filter(
    (p) =>
      p.name.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtroEstado === "" ||
        (p.status ? "Activo" : "Inactivo") === filtroEstado)
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
          className="bg-[#B4D9C4] px-4 py-2 rounded-md font-semibold text-[#2A5559] hover:bg-[#9fceb3] transition"
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
              <tr
                key={p.dogId}
                className="border-t hover:bg-gray-100 text-black"
              >
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  <img
                    src={p.imgUrl}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://img.freepik.com/vector-gratis/sello-textura-huellas-patas_78370-2951.jpg?semt=ais_hybrid&w=740")
                    }
                  />
                </td>
                <td className="p-2">{p.sex === "H" ? "Hembra" : "Macho"}</td>
                <td className="p-2">{p.city}</td>
                <td className="p-2">{p.description}</td>
                <td className="p-2">{p.status ? "Activo" : "Inactivo"}</td>
                <td className="p-2">
                  <button onClick={() => abrirModal(p)}>
                    <Edit className="w-5 h-5 text-[#2A5559] hover:text-black" />
                  </button>
                </td>
                <td className="p-2">
                  <Link
                    href={routes.gestionProductos(p.dogId!)}
                    className="text-[#2A5559] hover:text-black"
                  >
                    <Package className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-md text-white font-semibold transition ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2A5559] hover:bg-[#1d3e3e]"
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
          className={`px-5 py-2 rounded-md text-white font-semibold transition ${
            page >= Math.ceil(perritos.total / limit)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2A5559] hover:bg-[#1d3e3e]"
          }`}
        >
          Siguiente →
        </button>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md p-6 bg-white rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-center text-[#2A5559]">
              {editando ? "Editar Perrito" : "Agregar Perrito"}
            </h3>

            <div className="space-y-3 text-black">
              {/* Campos de texto */}
              {/* Campos de texto (name, city, description) */}
              {(
                ["name", "city", "description"] as Array<keyof DogFormData>
              ).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-2 border rounded-md"
                  value={form[field] as string}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                />
              ))}

              {/* Campo SEX (select con opciones válidas para el DTO) */}
              <select
                className="w-full p-2 border rounded-md"
                value={form.sex}
                onChange={(e) =>
                  setForm({ ...form, sex: e.target.value as "M" | "H" })
                }
              >
                <option value="">Selecciona sexo</option>
                <option value="M">Macho</option>
                <option value="H">Hembra</option>
              </select>

              {/* Subir imagen */}
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-md"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImagenFile(file);
                    const vistaTemporal = URL.createObjectURL(file);
                    setForm((prev) => ({ ...prev, imgUrl: vistaTemporal }));
                  }
                }}
              />
              {form.imgUrl && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-[#2A5559] mb-1">
                    Vista previa:
                  </p>
                  <img
                    src={form.imgUrl}
                    alt="Vista previa"
                    className="w-24 h-24 object-cover rounded border border-gray-300"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://img.freepik.com/vector-gratis/sello-textura-huellas-patas_78370-2951.jpg?semt=ais_hybrid&w=740")
                    }
                  />
                </div>
              )}

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

              <div className="flex justify-between mt-4">
                <button
                  onClick={guardarPerrito}
                  className="bg-[#2A5559] px-4 py-2 rounded-md text-white hover:bg-[#1d3e3e]"
                >
                  Guardar
                </button>
                <button
                  onClick={cerrarModal}
                  className="bg-[#F2F2F0] px-4 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
