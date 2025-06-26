"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import classNames from "classnames";
import { getDogId } from "@/service/dogs";
import { IProducts } from "@/interface/IProducts";
import ProductModal from "./ProductModal";
import { assignProductToDog, createProduct } from "@/service/products";
import { toast } from "react-toastify"

interface Perrito {
  id: string;
  nombre: string;
}

interface Props {
  perrito: Perrito;
  refreshKey: number;
}

export default function ProductTable({ perrito, refreshKey }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchDog = async () => {
      const res = await getDogId(perrito.id);
      if (res) {
        setProducts(res.products ?? []);
      }
    };

    fetchDog();
  }, [perrito.id, refreshKey, refreshTrigger]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-[#F2F2F0] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={router.back}
          className="bg-[#B4D9C4] text-[#2A5559] px-6 py-2 rounded-full font-semibold shadow hover:bg-[#33A69A] transition"
        >
          Volver a perritos
        </button>

        <button
          onClick={handleAddProduct}
          className="bg-[#D9E400] text-[#2A5559] px-6 py-2 rounded-full font-bold hover:bg-[#C0CC00] transition"
        >
          + Agregar producto a {perrito.nombre}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center text-[#2A5559] mb-8">
        TABLA DE PRODUCTOS DE {perrito.nombre}
      </h1>

      {products.length === 0 ? (
        <div className="text-center mt-10 text-[#2A5559]">
          <p className="text-lg mb-4">
            Este perrito aún no tiene productos asignados.
          </p>
        </div>
      ) : (
        <div>
          <table className="w-full overflow-hidden text-left shadow rounded-xl">
            <thead className="bg-[#D0CBC7] text-[#593723]">
              <tr>
                <th className="p-3">Producto</th>
                <th className="p-3">Monto S/</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Img</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white text-[#2A5559]">
              {products.map((product) => (
                <tr key={product.productId} className="border-b hover:bg-[#E6EFEA] transition">
                  <td className="p-3">
                    <span className="bg-[#F2F2F0] text-[#2A5559] px-3 py-1 rounded-full font-medium border border-[#B4D9C4]">
                      {product.name}
                    </span>
                  </td>
                  <td className="p-3 font-medium">
                    ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                  </td>
                  <td className="p-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.status}
                        readOnly
                        className="sr-only peer"
                      />
                      <div
                        className={classNames(
                          "w-11 h-6 bg-gray-300 rounded-full transition-colors relative",
                          { "bg-[#33A69A]": product.status }
                        )}
                      >
                        <div
                          className={classNames(
                            "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                            { "translate-x-5": product.status }
                          )}
                        ></div>
                      </div>
                    </label>
                  </td>
                  <td className="p-3">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="object-cover w-10 h-10 rounded"
                    />
                  </td>
                  <td className="flex gap-2 p-3">
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
      )}

      {showModal && (
        <ProductModal
          product={selectedProduct ?? undefined}
          onSave={async (product) => {
            try {
              // 1. Crear el producto
              const nuevoProducto = await createProduct({
                name: product.name,
                price: product.price,
                imgUrl: product.imgUrl,
              });

              // 2. Asignar el producto al perrito
              await assignProductToDog(perrito.id, nuevoProducto.productId);
              toast.success("Producto agregado correctamente 🐶");

              // 3. Cerrar el modal y refrescar la tabla
              setShowModal(false);
              setRefreshTrigger((prev) => prev + 1);
            } catch (error) {
              toast.error("Ocurrió un error al guardar el producto 😥");
              console.error("Error al guardar el producto:", error);
            }
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
