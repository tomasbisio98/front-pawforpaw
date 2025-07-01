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
          "https://res.cloudinary.com/dziccimdv/image/upload/v1751335797/perros1_lngkqj.jpg",
          "https://res.cloudinary.com/dziccimdv/image/upload/v1751335797/perritos-corriendo2_bjvhdi.png",
          "https://res.cloudinary.com/dziccimdv/image/upload/v1751335797/perrito_y_ni%C3%B1os3_tq6inm.jpg",
          "https://res.cloudinary.com/dziccimdv/image/upload/v1751335798/perritos4_r7o7dy.jpg",
          "https://res.cloudinary.com/dziccimdv/image/upload/v1751335797/perritos5_q8urlk.jpg",
          "https://res.cloudinary.com/dziccimdv/image/upload/v1751335796/perritoSolo6_auscxz.jpg"
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

