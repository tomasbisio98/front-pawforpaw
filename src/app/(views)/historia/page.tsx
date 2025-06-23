/* eslint-disable @next/next/no-img-element */
import React from "react";

const Historia = () => {
  return (
    <main className="min-h-screen bg-[#F2F2F0] px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Nuestra Historia
      </h1>

      {/* Sección de cápsulas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl mb-4">🐾</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Nuestro Origen</h2>
          <p className="text-gray-600">
            Nacimos del amor por los animales sin hogar. Empezamos con pocos recursos y mucho corazón.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Comunidad</h2>
          <p className="text-gray-600">
            Gracias a donaciones, voluntarios y personas como tú, rescatamos, curamos y cuidamos a quienes más lo necesitan.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Seguimos Creciendo</h2>
          <p className="text-gray-600">
            Porque mientras exista un perrito esperando, nuestra labor no se detiene. Tu apoyo hace la diferencia.
          </p>
        </div>
      </div>

      {/* Galería de fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {[
          "https://www.premiosvoluntariado.com/sites/Satellite?blobcol=urldata&blobkey=id&blobtable=MungoBlobs&blobwhere=1591780263740&ssbinary=true",
          "https://elmundo.cr/wp-content/uploads/2024/07/Zaguaton-2.jpg",
          "https://us.123rf.com/450wm/dekazigzag/dekazigzag2210/dekazigzag221000391/192825598-ni%C3%B1o-y-ni%C3%B1a-activos-hermano-y-hermana-abrazando-amorosamente-a-su-perro-mascota-al-aire-libre-en.jpg?ver=6",
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Momento ${i + 1}`}
            className="rounded-xl object-cover w-full h-64 shadow-sm hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </main>
  );
};

export default Historia;

