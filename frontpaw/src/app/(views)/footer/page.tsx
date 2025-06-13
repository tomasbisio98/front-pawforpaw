import React from "react";
const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                <img src="/paw.png" className="h-40 me-40" alt="Paw logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  2025 Fundacion PawforPaw
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
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
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://wa.me/+51965336318?text=hola%2C%20quisiera%20hablar%20con%20la%20fundacion"
                      className="hover:underline"
                    >
                      whatsapp
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      correo@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <span> SUSCRIBETE A NUESTRO NEWSLETTER </span>
            <input
              className="w-20px h-10px border-2 border-gray-300 rounded-md mr-6 ml-6"
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
