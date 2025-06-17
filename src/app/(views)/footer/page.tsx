/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { routes } from "@/routes";
import Link from "next/link";
import React from "react";
import Newletter from "./components/NewLetter";

const Footer = () => {
  return (

     <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <div className="w-full max-w-screen-xl px-4 py-6 mx-auto">
        {/* Grid general */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img src="/paw.png" className="h-12" alt="Paw logo" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Fundación PawforPaw
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              "Por cada mano que ayuda, una patita que sana"
            </p>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col items-end gap-4">
            {/* Newsletter + título */}
            <div className="flex items-center gap-3">
              <Newletter />
            </div>

            {/* Contacto */}
            <div className="text-right">
              <h2 className="mb-1 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                CONTÁCTENOS
              </h2>
              <ul className="text-sm space-y-1">
                <li>
                  <Link href="#" className="hover:underline">
                    Whatsapp: +51 965 336 318
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    contactanos@pawforpaw.org
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <hr className="my-4 border-gray-200 dark:border-gray-700" />

        {/* Footer final */}
        <section className="text-center text-sm text-[#B4D9C4]">
          © 2025{" "}
          <Link href={routes.inicio} className="text-white hover:underline">
            Fundación PawforPaw™
          </Link>
          . Todos los derechos reservados. | Desarrollado por Tomas, Mariana, Juan, Nico, Karen y Brenda
        </section>
      </div>
    </footer>
  );
};

export default Footer;

