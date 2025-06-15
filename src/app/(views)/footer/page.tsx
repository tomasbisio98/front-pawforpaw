import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#2A5559] text-white">
        <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                <img src="/paw.png" className="h-40 me-3" alt="Paw logo" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  Fundacion PawforPaw 2025
                </h2>
                <ul className="font-medium text-[#B4D9C4]">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      "Por cada mano que ayuda, una patita que sana"
                    </a>
                  </li>
                </ul>
              </div>

              <div></div>

              <div>
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  Contáctenos
                </h2>
                <ul className="font-medium text-[#B4D9C4]">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Whatsapp +51 965 336 318
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      contactanos@pawforpaw.org
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <span className="block text-sm font-medium">
              SUSCRÍBETE A NUESTRO NEWSLETTER
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="h-10 rounded-lg w-60 px-4 text-[#2A5559] bg-[#F2F2F0] placeholder:text-[#593723] focus:outline-none"
              />
              <button className="h-10 px-4 rounded-lg bg-[#33A69A] text-white hover:bg-[#2A5559] transition-colors">
                Enviar
              </button>
            </div>
          </div>

          <hr className="my-6 border-[#B4D9C4]" />

          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-[#B4D9C4] sm:text-center">
              © 2025{" "}
              <a href="#" className="text-white hover:underline">
                Fundación PawforPaw™
              </a>
              . Todos los derechos reservados. | Desarrollado por Tomas,
              Mariana, Juan, Nico, Karen y Brenda
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
