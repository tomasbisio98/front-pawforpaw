"use client";

import { useEffect, useState } from "react";
import { getDogId } from "@/service/dogs";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { routes } from "@/routes";
import { IDogs } from "@/interface/IDogs";
import { IProducts } from "@/interface/IProducts";
import { FiArrowLeft } from "react-icons/fi";
import { HeartHandshake, PawPrint } from "lucide-react";
import DonationModal from "@/components/modals/DonationModal";

export default function DogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string[]; // [...slug] = [id, name]
  const [dog, setDog] = useState<IDogs | null>(null);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(
    null
  );
  const [sortOption, setSortOption] = useState<"name" | "price" | "">("");

  useEffect(() => {
    const fetchDog = async () => {
      if (!slug || slug.length === 0) return;
      const [id] = slug;
      if (!id || id === "undefined") return;

      const fetchedDog = await getDogId(id, true);
      setDog(fetchedDog || null);
    };

    fetchDog();
  }, [slug]);

  const sortedProducts =
    dog?.products?.slice()?.sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "price") return Number(a.price) - Number(b.price);
      return 0;
    }) || [];

  return (
    <main className="px-4 py-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-start mb-6 px-8">
        <Link
          href={routes.perritos}
          className="text-green-900 font-medium bg-verdeSuave rounded-md px-4 py-2 flex items-center gap-2"
        >
          <FiArrowLeft /> Regresar a Perritos
        </Link>
      </div>

      {dog ? (
        <>
          <div className="flex flex-col items-center justify-center w-full max-w-lg rounded-2xl shadow-md bg-white mb-6 px-6 py-8">
            <Image
              src={dog.imgUrl || "/placeholder-dog.png"}
              alt={`Foto de ${dog.name}`}
              width={400}
              height={256}
              className="rounded-xl object-cover w-full h-64 mb-6 shadow"
              priority
            />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {dog.name}
            </h2>
            <p className="text-gray-700 text-base">{dog.description}</p>
            <p className="text-gray-700 text-base">
              Género: {dog.sex === "M" ? "Macho" : "Hembra"}
            </p>
            <p className="text-gray-700 text-base mb-4">Ciudad: {dog.city}</p>

            <button
              onClick={() => setShowAdoptModal(true)}
              className="flex items-center gap-2 bg-verdeClaro hover:bg-[#1B9780] text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all mt-4"
            >
              <PawPrint className="w-5 h-5" />
              Adoptar
            </button>
          </div>

          <div className="w-full max-w-5xl px-6">
            <div className="flex flex-wrap gap-4 items-center justify-end mb-6">
              <label className="text-sm font-medium text-gray-700">
                Ordenar por:
              </label>
              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value as "name" | "price" | "")
                }
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="">Sin ordenar</option>
                <option value="name">Nombre (A-Z)</option>
                <option value="price">Precio (menor a mayor)</option>
              </select>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {sortedProducts.map((product) => (
                <div
                  key={product.productId}
                  className="border rounded-xl shadow bg-white p-4 flex flex-col items-center"
                >
                  <Image
                    src={product.imgUrl}
                    alt={product.name}
                    width={200}
                    height={150}
                    className="rounded-md mb-3 object-cover"
                  />
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    ${Number(product.price).toFixed(2)}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDonationModal(true);
                    }}
                    className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    Donar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* MODAL ADOPTAR */}
          {showAdoptModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-blancoSuave border-2 border-verdeClaro rounded-2xl shadow-2xl p-6 w-full max-w-md text-center space-y-5 animate-fadeIn">
                {/* Ícono emocional */}
                <div className="text-4xl">🐾</div>

                <h2 className="text-2xl font-bold text-verdeOscuro">
                  ¡Gracias por querer adoptar!
                </h2>

                <p className="text-negro text-sm">
                  Estamos felices de que quieras darle un hogar a uno de
                  nuestros peluditos. 💚
                  <br />
                  Escribinos a{" "}
                  <a
                    href="mailto:pawforpaw2025@gmail.com"
                    className="text-[#1B9780] font-semibold underline hover:text-verdeClaro"
                  >
                    pawforpaw2025@gmail.com
                  </a>{" "}
                  y te contamos cómo iniciar el proceso de adopción.
                </p>

                <button
                  onClick={() => setShowAdoptModal(false)}
                  className="mt-2 px-5 py-2 rounded-xl bg-[#1B9780] hover:bg-verdeClaro text-white font-semibold transition-all"
                >
                  💌 Cerrar
                </button>
              </div>
            </div>
          )}

          {/* MODAL DONACIÓN */}
          {selectedProduct && dog && (
            <DonationModal
              open={showDonationModal}
              setOpen={setShowDonationModal}
              product={selectedProduct}
              dogId={dog.dogId!} // ← obligatorio que este sea un UUID
            />
          )}
        </>
      ) : (
        <p className="text-gray-600 text-center">Cargando perrito...</p>
      )}
    </main>
  );
}
