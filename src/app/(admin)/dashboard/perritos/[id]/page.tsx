"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Product {
  name: string;
  price: number;
  active: boolean;
  image: string;
}

export default function ProductModalPage() {
  const { id } = useParams(); // ID del perrito
  const router = useRouter();

  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    active: true,
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podrías hacer la petición POST o PUT al backend
    console.log("Producto guardado para perrito ID:", id, product);

    // Simulación de redirección
    router.push(`/dashboard/components/GestionPerritos/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F0] p-6">
      <h1 className="text-2xl font-bold text-[#2A5559] mb-6 text-center">
        Agregar producto al perrito con ID: {id}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-6 mx-auto space-y-4 bg-white shadow rounded-xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          className="w-full px-4 py-2 border rounded"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          className="w-full px-4 py-2 border rounded"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          className="w-full px-4 py-2 border rounded"
          value={product.image}
          onChange={handleChange}
        />
        <label className="flex items-center gap-2 text-[#2A5559] font-semibold">
          <input
            type="checkbox"
            name="active"
            checked={product.active}
            onChange={handleChange}
          />
          Activo
        </label>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[#33A69A] text-white px-4 py-2 rounded hover:bg-[#2A5559] transition"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
