// components/HomeContent.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { routes } from "@/routes";

const HomeContent = () => {
  const imagenes = ["/carrusel12.png", "/carrusel2.png", "/carrusel3.png"];

  return (
    <main className="px-6 py-10 space-y-12 bg-[#F2F2F0] text-[#593723]">
      {/* Carrusel de Swiper con imágenes reales */}
      <div className="w-full overflow-hidden rounded-lg h-60 md:h-96">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="h-full"
        >
          {imagenes.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-60 md:h-96">
                <Image
                  src={src}
                  alt={`Imagen carrusel ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Donación destacada */}
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold text-[#2A5559]">
          Fundación PawForPaw
        </h2>
        <a
          href={routes.perritos}
          className="inline-block px-4 py-2 text-sm font-medium bg-[#33A69A] rounded-full hover:text-[#2A5559]"
          style={{ color: "white" }}
        >
          ¿Quieres colaborar con una donación?
        </a>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
        {[
          {
            titulo: "🐾 Misión",
            contenido:
              "Brindar amor, refugio y una segunda oportunidad a perros en situación de abandono o maltrato, rescatándolos, rehabilitándolos y reinsertándolos en hogares responsables, promoviendo además la tenencia responsable y el respeto por la vida animal.",
          },
          {
            titulo: "🌈 Visión",
            contenido:
              "Ser una fundación líder en la protección y bienestar animal, reconocida por transformar vidas tanto de perros rescatados como de las familias que los adoptan, construyendo una sociedad más empática, responsable y consciente del valor de cada ser vivo.",
          },
          {
            titulo: "💛 Valores",
            contenido:
              "Compasión, Responsabilidad, Compromiso, Transparencia, Educación y Trabajo en equipo. Cada acción que realizamos está guiada por estos principios para garantizar el bienestar integral de nuestros peludos.",
          },
        ].map((item, index) => (
          <div key={index} className="p-6 bg-[#B4D9C4] rounded-lg shadow-md">
            <h3 className="mb-2 font-bold text-[#2A5559]">{item.titulo}</h3>
            <p className="text-sm text-gray-700">{item.contenido}</p>
          </div>
        ))}
      </div>

      {/* ¿Cómo encontrarnos? */}
      <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
        <div className="p-6 bg-[#B4D9C4] rounded-lg">
          <p className="text-sm text-gray-700">
            Nuestro refugio está siempre abierto para quienes quieran conocer,
            ayudar o adoptar. Ven a compartir un rato con nuestras mascotas.
          </p>
        </div>
        <div className="flex items-center justify-center h-40 bg-[#B4D9C4] rounded-lg">
          <span className="text-4xl">📍</span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.3066629339471!2d-77.04174603044275!3d-12.09663029925902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85b30b87b41%3A0x808e31b993fde15b!2sAv.%20Nicol%C3%A1s%20de%20Ribera%20311%2C%20Lima%2015073!5e0!3m2!1ses-419!2spe!4v1749923584145!5m2!1ses-419!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
