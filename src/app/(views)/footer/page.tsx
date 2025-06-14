import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                <img src="/paw.png" className="h-20 me-3" alt="Paw logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Fundacion PawforPaw 2025
                </h2>
                <ul className="font-medium text-gray-500 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      "Por cada mano que ayuda, una patita que sana"
                    </a>
                  </li>
                </ul>
              </div>
              <div></div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Contactenos
                </h2>
                <ul className="font-medium text-gray-500 dark:text-gray-400">
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
          <div>
            <span>SUSCRIBETE A NUESTRO NEWSLETTER</span>
            <input
              className="h-10 rounded-lg w-60 bo10rder-gray-300 b-order htext-gray-900 py-02 px2-4 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
              type="email"
              placeholder="Correo electronico"
            />
            <button>Enviar</button>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025{" "}
              <a href="#" className="hover:underline">
                Fundacion PawforPaw™
              </a>
              . All Rights Reserved. | Desarrollado por Tomas , Mariana, Juan,
              Nico, Karen y Brenda
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
