"use client";

import { useEffect, useState } from "react";
import { getDogsFilter } from "@/service/dogs";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { routes } from "@/routes";
import { FiArrowLeft } from "react-icons/fi";
import { HeartHandshake, PawPrint } from "lucide-react";
import { IDogs } from "@/interface/IDogs";

const DogDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string[]; // [...slug] = [id, name]
  const [dog, setDog] = useState<IDogs | null>(null);

  useEffect(() => {
    const fetchDog = async () => {
      if (!slug || slug.length === 0) return;

      const [id] = slug;
      if (!id || id === "undefined") return;

      const dogsResponse = await getDogsFilter();
      const fetchedDog = dogsResponse.data.find((d: IDogs) => d.dogId === id);
      setDog(fetchedDog || null);
    };

    fetchDog();
  }, [slug]);

  return (
    <main className="px-4 py-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
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
                style={{ objectFit: "cover" }}
                priority
              />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{dog.name}</h2>
            <p className="text-gray-700 text-base">{dog.description}</p>
            <p className="text-gray-700 text-base">
              Género: {dog.sex === "M" ? "Macho" : "Hembra"}
            </p>
            <p className="text-gray-700 text-base">Ciudad: {dog.city}</p>
          </div>

          <div className="flex gap-4 pt-9 pb-24">
            <Link
              href="/donar"
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
            >
              <HeartHandshake className="w-5 h-5" />
              Donar
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 bg-verdeClaro hover:bg-[#1B9780] text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
            >
              <PawPrint className="w-5 h-5" />
              Adoptar
            </Link>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center">Cargando perrito...</p>
      )}
    </main>
  );
};

export default DogDetailPage;