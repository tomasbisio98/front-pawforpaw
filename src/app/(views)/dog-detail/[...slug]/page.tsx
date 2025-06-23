import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, PawPrint } from "lucide-react";

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
      "She was rescued from the streets. Playful, loving, and a true sunshine napper.",
    image: "/dogs/luna.jpg", // Cambia a tu ruta de imagen real
  };

  return (
   <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-sm w-full rounded-2xl shadow-md overflow-hidden bg-white mb-6">
        <Image
          src={dog.image}
          alt={`Photo of ${dog.name}`}
          width={400}
          height={300}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <p className="text-gray-700 text-base text-center">{dog.description}</p>
        </div>
      </div>

      {/* Botones fuera de la tarjeta */}
      <div className="flex gap-4">
        <Link
          href="/donar"
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
        >
          <HeartHandshake className="w-5 h-5" />
          Donate
        </Link>

        <Link
          href={`/adoptar/${dog.id}`}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-2xl shadow transition-all"
        >
          <PawPrint className="w-5 h-5" />
          Adopt
        </Link>
      </div>
    </main>
  );
}
