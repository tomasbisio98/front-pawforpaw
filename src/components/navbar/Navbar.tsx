import React from "react";
import { routes } from "../../routes";

const Navbar = () => {
  return (
    <>
      <nav className="border-[#2A5559] bg-[#F2F2F0]">

      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">

        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/paw.png" className="h-8" alt="Paw logo" />

            <span className="self-center text-2xl font-semibold text-[#2A5559]">

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">

              PawForPaw
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"

            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-[#2A5559] rounded-lg md:hidden hover:bg-[#B4D9C4] focus:outline-none focus:ring-2 focus:ring-[#33A69A]"

            className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"

            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >

            <ul className="flex flex-col mt-4 font-medium rounded-lg bg-[#F2F2F0] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <a
                  href={routes.inicio}
                  className="block px-3 py-2 text-white bg-[#2A5559] rounded-sm md:p-0 md:bg-transparent md:text-[#2A5559] hover:text-[#33A69A]"

            <ul className="flex flex-col mt-4 font-medium rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block px-3 py-2 text-white bg-blue-700 rounded-sm md:p-0 md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"

                  aria-current="page"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a

                  href={routes.perritos}
                  className="block px-3 py-2 text-[#593723] rounded-sm md:p-0 hover:text-[#2A5559]"

                  href="#"
                  className="block px-3 py-2 text-gray-900 rounded-sm md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

                >
                  Perritos
                </a>
              </li>
              <li>
                <a

                  href={routes.historia}
                  className="block px-3 py-2 text-[#593723] rounded-sm md:p-0 hover:text-[#2A5559]"

                  href="#"
                  className="block px-3 py-2 text-gray-900 rounded-sm md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Historia
                </a>
              </li>
              <li>
                <a
 
                  href={routes.AuthPage}
                  className="block px-3 py-2 text-[#593723] rounded-sm md:p-0 hover:text-[#2A5559]"

                  href="#"
                  className="block px-3 py-2 text-gray-900 rounded-sm md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
 
                >
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a
                  
                  href={routes.AuthPage}
                  className="block px-3 py-2 text-[#593723] rounded-sm md:p-0 hover:text-[#2A5559]"

                  href="#"
                  className="block px-3 py-2 text-gray-900 rounded-sm md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
 
                >
                  Registro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
