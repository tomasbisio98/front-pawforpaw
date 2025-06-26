"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Product {
  productId?: string;
  name: string;
  imgUrl: string;
  price: number;
}

interface ProductModalProps {
  product?: Product;
  onSave: (product: Product) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export default function ProductModal({
  product,
  onSave,
  onClose,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImgUrl(product.imgUrl);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleSave = () => {
    const validExtensions = /\.(jpg|jpeg|png|webp|gif)$/i;

    if (!name || !imgUrl || !price) {
      return alert("Todos los campos son obligatorios");
    }

    if (!validExtensions.test(imgUrl)) {
      return toast.error("La imagen debe ser .jpg, .jpeg, .png, .webp o .gif");
    }

    onSave({ ...product, name, imgUrl, price: parseFloat(price) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-[#F2F2F0] p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-[#2A5559] mb-4 text-center">
          AGREGA UN NUEVO PRODUCTO
        </h2>

        <div className="space-y-3">
          <input
            className="w-full border border-gray-300 rounded p-2 text-[#2A5559] placeholder:text-gray-500"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded p-2 text-[#2A5559] placeholder:text-gray-500"
            placeholder="URL de la imagen"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <input
            type="number"
            className="w-full border border-gray-300 rounded p-2 text-[#2A5559] placeholder:text-gray-500"
            placeholder="Monto"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-[#33A69A] text-white px-4 py-2 rounded hover:bg-[#2A5559] transition"
          >
            Guardar producto
          </button>

          <button
            onClick={onClose}
            className="bg-[#B4D9C4] text-[#593723] px-4 py-2 rounded hover:bg-[#A3CDB7] transition"
          >
            Salir
          </button>
        </div>

        {product && (
          <div className="mt-4 text-center">
            {/* <button
              onClick={onDelete}
              className="px-4 py-2 text-white transition bg-red-400 rounded hover:bg-red-600"
            >
              Eliminar
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
