/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { HeartHandshake, PawPrint } from "lucide-react";
import { routes } from "@/routes";
import { FiArrowLeft } from "react-icons/fi";

interface DogDetailPageProps {
  params: {
    id: string;
  };
}

export default function DogDetailPage({ params }: DogDetailPageProps) {
  const dog = {
    id: params.id,
    name: "Luna",
    description:
      "Fue rescatada de la calle. Juguetona, cariñosa y una verdadera dormilona.",
    image: "https://statics.somosjujuy.com.ar/2020/07/6341f42eb8858.jpg"
  };

  return (
   <main className="px-4 py-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center ">
      
      <div className="w-full flex justify-start mb-6 px-8">
        <Link
          href={routes.perritos}
          className="text-green-900 font-medium bg-verdeSuave rounded-md px-4 py-2 flex items-center gap-2"
        >
          <FiArrowLeft /> Regresar a Perritos
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-lg rounded-2xl shadow-md bg-white mb-6 px-6 py-8">
        <div className="w-3/4">
          <img
            src={dog.image}
            alt={`Photo of ${dog.name}`}
            className="rounded-xl object-cover w-full h-64 mb-6 shadow"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{dog.name}</h2>
          <p className="text-gray-700 text-base">{dog.description}</p>
        </div>
      </div>

    
      <div className="flex gap-4  pt-9 pb-24">
        <Link
          href="/donar"
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
        >
          <HeartHandshake className="w-5 h-5" />
          Donar
        </Link>

        <Link
          href={`#`}
          className="flex items-center gap-2 bg-verdeClaro hover:bg-[#1B9780] text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
        >
          <PawPrint className="w-5 h-5" />
          Adoptar
        </Link>
      </div>
    </main>
  );
}
