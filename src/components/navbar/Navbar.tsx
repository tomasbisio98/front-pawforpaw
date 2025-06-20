/* eslint-disable @next/next/no-img-element */
import React from "react";
import { routes } from "../../routes";
import Link from "next/link";
import { navbarLi } from "@/constants/navbar";
import NavList from "./components/NavList";
import AuthNav from "./components/AuthNav";

const Navbar = () => {
  return (
        <nav className="border-gray-500 bg-verdeOscuro  ">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
            <Link
              href={routes.inicio}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/paw.png" className="h-14 rounded-full " alt="Paw logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                PawForPaw
              </span>
            </Link>

              <ul className="flex flex-col mt-4 font-medium rounded-lg bg-[#F2F2F0] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent " >
                {navbarLi.map((navbarLi, idx) => (<NavList key={idx} {...navbarLi} />))}
              </ul>
              
              <AuthNav/>
                {/* <li>
                  <a
                    href={routes.AuthPage}
                    className="block px-3 py-2 text-white bg-[#2A5559] rounded-sm md:p-0 md:bg-transparent md:text-[#2A5559] hover:text-[#33A69A]"
                  >
                    Iniciar Sesión
                  </a>
                </li>
                <li>
                  <a
                    href={routes.AuthPage}
                    className="block px-3 py-2 text-white bg-[#2A5559] rounded-sm md:p-0 md:bg-transparent md:text-[#2A5559] hover:text-[#33A69A]"
                  >
                    Registro
                  </a>
                </li> */}
            </div>
        </nav>
  );
};

export default Navbar;

