/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { routes } from "@/routes";
import Link from "next/link";
import React from "react";
import Newletter from "./components/NewLetter";

const Footer = () => {
  return (
    <footer className="bg-verdeOscuro text-white text-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Logo y lema */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <img src="/paw.png" alt="Paw logo" className="h-10 rounded-full" />
              <h2 className="font-semibold uppercase text-base">Fundación PawForPaw</h2>
            </div>
            <p className="text-white text-xs italic">
              "Por cada mano que ayuda, una patita que sana"
            </p>
          </div>

          {/* Newsletter */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <Newletter />
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-1 text-center md:text-right">
            <h2 className="text-white uppercase font-semibold text-xs mb-1">
              Contáctenos
            </h2>
            <ul className="text-blancoConVerde space-y-1">
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

        {/* Línea divisoria */}
        <hr className="my-4 border-blancoConVerde" />

        {/* Créditos */}
        <div className="text-center text-xs text-blancoConVerde">
          © 2025{" "}
          <Link href={routes.inicio} className="text-white hover:underline font-medium">
            Fundación PawforPaw™
          </Link>
          . Todos los derechos reservados. | Desarrollado por Tomas, Mariana, Juan, Nico, Karen y Brenda
        </div>
      </div>
    </footer>
  );
};

export default Footer;
