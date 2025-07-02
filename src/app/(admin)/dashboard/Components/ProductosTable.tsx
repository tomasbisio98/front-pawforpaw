"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import Image from "next/image";
import { getDogId } from "@/service/dogs";
import { IProducts } from "@/interface/IProducts";
import ProductModal from "./ProductModal";
import {
  assignProductToDog,
  createProduct,
  updateProduct,
} from "@/service/products";
import { toast } from "react-toastify";

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
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(
    null
  );
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
    <div className="min-h-screen bg-[#F2F2F0] p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <button
          onClick={router.back}
          className="bg-[#B4D9C4] px-4 py-2 rounded-md font-semibold text-[#2A5559] hover:bg-[#9fceb3] transition"
        >
          Volver a perritos
        </button>

        <button
          onClick={handleAddProduct}
          className="bg-[#B4D9C4] px-4 py-2 rounded-md font-semibold text-[#2A5559] hover:bg-[#9fceb3] transition"
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
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white rounded-lg shadow-md">
            <thead className="bg-[#2A5559] text-white">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Imagen</th>
                <th className="p-2">Editar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.productId}
                  className="border-t hover:bg-gray-100 text-black transition"
                >
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">
                    $
                    {typeof product.price === "number"
                      ? product.price.toFixed(2)
                      : product.price}
                  </td>
                  <td className="p-2">
                    {product.status ? "Activo" : "Inactivo"}
                  </td>
                  <td className="p-2">
                    <Image
                      src={product.imgUrl}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-2">
                    <Edit
                      className="w-5 h-5 text-[#2A5559] hover:text-black cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ProductModal
          product={selectedProduct ?? undefined}
          onSave={async (product) => {
            try {
              if (selectedProduct) {
                await updateProduct(product.productId!, {
                  name: product.name,
                  price: product.price,
                  imgUrl: product.imgUrl,
                  status: product.status,
                });
                toast.success("Producto actualizado correctamente 🛠️");
              } else {
                const nuevoProducto = await createProduct({
                  name: product.name,
                  price: product.price,
                  imgUrl: product.imgUrl,
                });

                await assignProductToDog(perrito.id, nuevoProducto.productId);
                toast.success("Producto agregado correctamente 🐶");
              }

              setShowModal(false);
              setSelectedProduct(null);
              setRefreshTrigger((prev) => prev + 1);
            } catch (error) {
              toast.error("Ocurrió un error al guardar el producto 😥");
              console.error("Error al guardar el producto:", error);
            }
          }}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
