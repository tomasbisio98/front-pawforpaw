// components/HomeContent.tsx

import React from "react";

const HomeContent = () => {
  return (
    <main className="px-6 py-10 space-y-12">
      {/* Carrusel de imagen (puedes integrar Swiper u otro más adelante) */}
      <div className="flex items-center justify-center w-full bg-gray-200 rounded-lg h-72">
        <span className="text-xl text-gray-500">Imagen del Carrusel</span>
      </div>

      {/* Donación destacada */}
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">Fundación PawForPaw</h2>
        <p className="inline-block px-4 py-2 text-sm font-medium bg-yellow-300 rounded-full">
          ¿Quieres colaborar con una donación?
        </p>
      </div>

      {/* Tarjetas de información */}
      <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
        {[
          "Título (Visión, misión)",
          "Título (Visión, misión)",
          "Título (Visión, misión)",
        ].map((titulo, index) => (
          <div key={index} className="p-6 bg-gray-300 rounded-lg shadow-md">
            <h3 className="mb-2 font-bold">{titulo}</h3>
            <p className="text-sm text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor.
            </p>
          </div>
        ))}
      </div>

      {/* Sección ¿Cómo encontrarnos? */}
      <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-gray-200 rounded-lg">
          <p className="text-sm text-gray-700">
            Nuestro refugio está siempre abierto para quienes quieran conocer,
            ayudar o adoptar. Nos encontramos en un rincón lleno de patitas,
            amor y esperanza.
          </p>
        </div>
        <div className="flex items-center justify-center h-40 bg-gray-300 rounded-lg">
          <span className="text-4xl">📍</span>
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
