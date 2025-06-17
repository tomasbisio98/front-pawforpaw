/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { routes } from "@/routes";
import Link from "next/link";
import React from "react";
import Newletter from "./components/NewLetter";

const Footer = () => {
  return (

     <footer className="bg-verdeOscuro text-white">
      <div className="w-full max-w-screen-xl px-4 py-6 mx-auto">
      
        <div className="grid md:grid-cols-3 gap-8 items-start text-sm">
         

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img src="/paw.png" className="h-12" alt="Paw logo" />
              <h2 className="font-semibold uppercase text-white">
                Fundación PawforPaw
              </h2>
            </div>
            <p className="text-sm text-white">
              "Por cada mano que ayuda, una patita que sana"
            </p>
          </div>

          
            {/* Newsletter + título */}
            <div className="flex flex-col items-center  ">
              <Newletter />
            </div>

            {/* Contacto */}
            <div className="text-right">
              <h2 className="mb-1 text-sm font-semibold text-white uppercase">
                CONTÁCTENOS
              </h2>
              <ul className="font-medium text-blancoConVerde space-y-1">
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

        {/* Línea separadora */}
        <hr className="my-4 border-blancoConVerde" />

        {/* Footer final */}
        <section className="text-center text-sm text-blancoConVerde">
          © 2025 { " " }
          <Link href={routes.inicio} className="text-white hover:underline">
            Fundación PawforPaw™
          </Link>
          . Todos los derechos reservados. | Desarrollado por Tomas, 
          Mariana, Juan, Nico, Karen y Brenda
        </section>
      </div>
    </footer>
  );
};

export default Footer;

