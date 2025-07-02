"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { uploadTempProductImage } from "@/service/uploadProductImage";
import Image from "next/image";

interface Product {
  productId?: string;
  name: string;
  imgUrl: string;
  price: number;
  status?: boolean;
}

interface ProductModalProps {
  product?: Product;
  onSave: (product: Product) => void;
  onClose: () => void;
}

export default function ProductModal({
  product,
  onSave,
  onClose,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImgUrl(null); // Reset, no precargar en input file
      setPrice(product.price.toString());
      setStatus(product.status ?? true);
    }
  }, [product]);

  const handleSave = async () => {
    if (!name.trim() || !price.trim()) {
      toast.error("🚫 Todos los campos son obligatorios");
      return;
    }

    if (!name.trim()) {
      toast.error("📝 El nombre es obligatorio");
      return;
    }

    if (name.length < 3 || name.length > 30) {
      toast.error("📝 El nombre debe tener entre 3 y 30 caracteres");
      return;
    }

    if (!price.trim()) {
      toast.error("💰 El precio es obligatorio");
      return;
    }

    const precioNumerico = parseFloat(price);
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      toast.error("💸 El precio debe ser mayor a 0");
      return;
    }

    try {
      setIsLoading(true);

      let finalImageUrl = product?.imgUrl || "";

      if (imgUrl instanceof File) {
        finalImageUrl = await uploadTempProductImage(imgUrl);
      }

      const productoFinal: Product = {
        ...product,
        name,
        imgUrl: finalImageUrl,
        price: parseFloat(price),
        status,
      };

      onSave(productoFinal);
    } catch (error) {
      console.error("❌ Error al guardar producto:", error);
      toast.error("Ocurrió un error al guardar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-md p-6 bg-white rounded-xl">
        <h3 className="mb-4 text-xl font-bold text-center text-[#2A5559]">
          {product ? "Editar Producto" : "Agregar Producto"}
        </h3>

        <div className="space-y-3 text-black">
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Imagen actual (modo edición) */}
          {!imgUrl && product?.imgUrl && (
            <div className="flex justify-center">
              <Image
                src={product.imgUrl}
                alt="Imagen actual"
                width={100}
                height={100}
                className="rounded object-cover"
              />
            </div>
          )}

          {/* Subir imagen */}
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-md"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImgUrl(file);
            }}
          />

          {/* Vista previa */}
          {imgUrl && (
            <div className="mt-2">
              <p className="text-sm font-medium text-[#2A5559] mb-1">
                Vista previa:
              </p>
              <img
                src={URL.createObjectURL(imgUrl)}
                alt="Vista previa"
                className="w-24 h-24 object-cover rounded border border-gray-300"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://img.freepik.com/vector-gratis/sello-textura-huellas-patas_78370-2951.jpg?semt=ais_hybrid&w=740")
                }
              />
              <button
                onClick={() => setImgUrl(null)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Quitar imagen seleccionada
              </button>
            </div>
          )}

          {/* Precio */}
          <input
            type="number"
            placeholder="Precio"
            className="w-full p-2 border rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Estado */}
          <select
            className="w-full p-2 border rounded-md"
            value={status ? "activo" : "inactivo"}
            onChange={(e) => setStatus(e.target.value === "activo")}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          {/* Botones */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2A5559] hover:bg-[#1d3e3e]"
              }`}
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              )}
              {isLoading ? "Guardando..." : "Guardar"}
            </button>

            <button
              onClick={onClose}
              className="bg-[#F2F2F0] px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
