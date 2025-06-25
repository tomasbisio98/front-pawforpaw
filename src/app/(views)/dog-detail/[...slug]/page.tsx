"use client";

import { useEffect, useState } from "react";
import { getDogId } from "@/service/dogs";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { routes } from "@/routes";
import { FiArrowLeft } from "react-icons/fi";
import { HeartHandshake, PawPrint, X } from "lucide-react";
import { IDogs } from "@/interface/IDogs";

const DogDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string[];
  const [dog, setDog] = useState<IDogs | null>(null);
  const [sortOption, setSortOption] = useState("none");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDog = async () => {
      if (!slug || slug.length === 0) return;

      const [id] = slug;
      if (!id || id === "undefined") return;

      const fetchedDog = await getDogId(id);
      setDog(fetchedDog || null);
    };

    fetchDog();
  }, [slug]);

  const sortedProducts = () => {
    if (!dog?.products) return [];

    const productsCopy = [...dog.products];

    switch (sortOption) {
      case "name":
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "price":
        return productsCopy.sort((a, b) => Number(a.price) - Number(b.price));
      default:
        return productsCopy;
    }
  };

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
              src={dog.imgUrl}
              alt={`Foto de ${dog.name}`}
              width={400}
              height={256}
              className="rounded-xl object-cover w-full h-64 mb-6 shadow"
              priority
            />
          </div>

          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{dog.name}</h2>
            <p className="text-gray-700 text-base">{dog.description}</p>
            <p className="text-gray-700 text-base">Género: {dog.sex === "M" ? "Macho" : "Hembra"}</p>
            <p className="text-gray-700 text-base mb-4">Ciudad: {dog.city}</p>
          </div>

          {/* Botón Adoptar */}
          <div className="mb-6">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-verdeClaro hover:bg-[#1B9780] text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
            >
              <PawPrint className="w-5 h-5" />
              Adoptar
            </button>
          </div>

          {/* Modal */}
          {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
      >
        <X />
      </button>
      <h3 className="text-lg font-bold text-black mb-4">¿Querés adoptar?</h3>
      <p className="text-gray-700 mb-4">
        Por favor contactate a{" "}
        <a
          href="mailto:pawforpaw2025@gmail.com"
          className="text-blue-600 underline"
        >
          pawforpaw2025@gmail.com
        </a>
      </p>
      <button
        onClick={() => setShowModal(false)}
        className="bg-verdeClaro hover:bg-[#1B9780] text-white px-4 py-2 rounded"
      >
        Entendido
      </button>
    </div>
  </div>
)}


          {/* Filtros de ordenamiento */}
          <div className="w-full max-w-md mb-8 px-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por:
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 shadow-sm bg-white"
            >
              <option value="none">Sin ordenar</option>
              <option value="name">Nombre (A-Z)</option>
              <option value="price">Precio (menor a mayor)</option>
            </select>
          </div>

          {/* Productos */}
          <div className="w-full max-w-4xl px-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {sortedProducts().map((product) => (
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
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-700 mb-3">${Number(product.price).toFixed(2)}</p>

                <a
                  href="mailto:pawforpaw2025@gmail.com?subject=Donación de producto"
                  className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl transition"
                >
                  <HeartHandshake className="w-4 h-4" />
                  Donar
                </a>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center">Cargando perrito...</p>
      )}
    </main>
  );
};

export default DogDetailPage;