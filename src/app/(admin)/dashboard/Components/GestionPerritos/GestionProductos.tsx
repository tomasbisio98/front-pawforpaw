"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Package } from "lucide-react";
import classNames from "classnames";

interface Product {
  name: string;
  price: number;
  active: boolean;
  image: string;
}

interface Perrito {
  id: string;
  nombre: string;
}

// Simulación de datos de perritos
const perritos: Perrito[] = [
  { id: "1", nombre: "Milka" },
  { id: "2", nombre: "Firulais" },
];

// Simulación de productos por perrito
const productosPorPerrito: Record<string, Product[]> = {
  "1": [
    { name: "Cama", price: 500.0, active: true, image: "/box.png" },
    { name: "Juguete", price: 100.0, active: false, image: "/box.png" },
  ],
  "2": [
    { name: "Pelota", price: 50.0, active: true, image: "/box.png" },
    { name: "Correa", price: 70.0, active: false, image: "/box.png" },
  ],
};

export default function ProductTable() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const perrito = perritos.find((p) => p.id === id);
  const products = productosPorPerrito[id] ?? [];

  if (!perrito) {
    return (
      <div className="p-6 text-[#593723] text-center font-semibold">
        Perrito no encontrado 🐾
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F2F2F0] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={router.back}
          className="bg-[#B4D9C4] text-[#2A5559] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#33A69A] transition"
        >
          Volver a perritos
        </button>
        <button className="bg-[#D9E400] text-[#2A5559] px-6 py-2 rounded-full font-bold hover:bg-[#C0CC00] transition">
          + Agregar producto a {perrito.nombre}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center text-[#2A5559] mb-8">
        TABLA DE PRODUCTOS DE {perrito.nombre}
      </h1>

      <table className="w-full overflow-hidden text-left shadow rounded-xl">
        <thead className="bg-[#D0CBC7] text-[#593723]">
          <tr>
            <th className="p-3">Producto</th>
            <th className="p-3">Monto S/</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Img URL</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white text-[#2A5559]">
          {products.map((product, idx) => (
            <tr key={idx} className="border-b hover:bg-[#E6EFEA] transition">
              <td className="p-3">
                <span className="bg-[#F2F2F0] text-[#2A5559] px-3 py-1 rounded-full font-medium border border-[#B4D9C4]">
                  {product.name}
                </span>
              </td>
              <td className="p-3 font-medium">{product.price.toFixed(2)}</td>
              <td className="p-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.active}
                    readOnly
                    className="sr-only peer"
                  />
                  <div
                    className={classNames(
                      "w-11 h-6 bg-gray-300 rounded-full transition-colors relative",
                      { "bg-[#33A69A]": product.active }
                    )}
                  >
                    <div
                      className={classNames(
                        "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                        { "translate-x-5": product.active }
                      )}
                    ></div>
                  </div>
                </label>
              </td>
              <td className="p-3">
                <a>
                  <Package className="w-6 h-6 text-[#593723]" />
                </a>
              </td>
              <td className="p-3">
                <a href="#">
                  <Pencil className="w-5 h-5 text-[#2A5559] hover:text-[#33A69A] cursor-pointer" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-6 text-[#2A5559] font-medium">
        1 2 3 <span className="underline cursor-pointer">siguiente &gt;</span>
      </div>
    </div>
  );
}


