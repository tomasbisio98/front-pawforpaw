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
  const imagenes = ["/carrusel12.png", "/carrusel23.png", "/carrusel3.png"];

  return (
    <main className="px-6 py-10 space-y-16 bg-blancoSuave text-marronOscuro font-nunito">

      {/* 🎞 Carrusel */}
      <div className="w-full overflow-hidden rounded-2xl shadow-xl h-60 md:h-96">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
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
                  className="object-cover rounded-2xl"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ❤️ Donación destacada */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-verdeOscuro">Fundación PawForPaw</h2>
        <a
          href={routes.perritos}
          className="inline-block px-6 py-3 rounded-full text-white bg-verdeClaro hover:bg-verdeOscuro transition-colors font-semibold"
        >
          ¿Quieres colaborar con una donación?
        </a>
      </div>

      {/* 🧩 Misión / Visión / Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div key={index} className="p-6 bg-blancoConVerde rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-verdeOscuro mb-2">{item.titulo}</h3>
            <p className="text-sm text-marronOscuro leading-relaxed">{item.contenido}</p>
          </div>
        ))}
      </div>

      {/* 📍 Cómo encontrarnos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-6 bg-blancoConVerde rounded-2xl shadow-xl space-y-2">
          <h3 className="text-lg font-bold text-verdeOscuro">¿Dónde encontrarnos?</h3>
          <p className="text-sm text-marronOscuro">
            Nuestro refugio está siempre abierto para quienes quieran conocer,
            ayudar o adoptar. Ven a compartir un rato con nuestras mascotas.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-xl h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.3066629339471!2d-77.04174603044275!3d-12.09663029925902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85b30b87b41%3A0x808e31b993fde15b!2sAv.%20Nicol%C3%A1s%20de%20Ribera%20311%2C%20Lima%2015073!5e0!3m2!1ses-419!2spe!4v1749923584145!5m2!1ses-419!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default HomeContent;
