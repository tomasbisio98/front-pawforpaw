/* eslint-disable @next/next/no-img-element */
"use client";

import { IProducts } from "@/interface/IProducts";

import { useAuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DonationModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  product: IProducts | null;
  dogId: string; // 👈 Nuevo prop
}

const DonationModal = ({
  open,
  setOpen,
  product,
  dogId,
}: DonationModalProps) => {
  const { token, isAuth } = useAuthContext();
  const router = useRouter()

  if (!open || !product) return null;

  const handleDonate = async () => {
    if (!isAuth) {
    // Mostrar mensaje y redirigir
    toast.warn("Tienes que tener cuenta para poder donar 🐾", {
      onClose: () => router.push("/authpag"), // o "/auth/register"
    })
    return
  }
    const payload = {
      products: [
        {
          productId: product.productId,
          price_unit: Number(product.price),
          dogs: [dogId],
        },
      ],
    };
    console.log("🧪 dogId:", dogId);
    console.log("🐶 Payload que se enviará:", payload);
    console.log("🔐 Token:", token);

    try {
      const response = await fetch("/api/stripe-donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("⚠️ Respuesta sin URL:", data);
      }
    } catch (error) {
      console.error("❌ Error en donación:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-700"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Resumen de tu donación
        </h3>

        <div className="flex flex-col items-center">
          <img
            src={product.imgUrl}
            alt={product.name}
            width={220}
            height={150}
            className="rounded mb-4 object-cover"
          />
          <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
          <p className="text-gray-600 text-base mb-6">
            Precio: ${Number(product.price).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleDonate}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition"
          >
            Donar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
