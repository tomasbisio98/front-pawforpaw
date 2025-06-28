/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { routes } from "../../routes";
import { navbarLi } from "@/constants/navbar";
import NavList from "./components/NavList";
import AuthNav from "./components/AuthNav";

const Navbar = () => {
  return (
    <nav className="bg-verdeOscuro shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        {/* Logo y Título */}
        <Link href={routes.inicio} className="flex items-center gap-3">
          <img
            src="/paw.png"
            alt="Paw logo"
            className="h-11 w-11 rounded-full"
          />
          <span className="text-2xl font-semibold text-white tracking-wide">
            PawForPaw
          </span>
        </Link>

        {/* Menú de Navegación */}
        <ul className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 gap-2 md:gap-6 bg-[#F2F2F0] md:bg-transparent px-4 md:px-0 py-2 md:py-0 rounded-lg md:rounded-none text-base md:text-lg font-semibold">
          {navbarLi.map((item, idx) => (
            <NavList key={idx} {...item} />
          ))}
        </ul>

        {/* Autenticación */}
        <div className="mt-4 md:mt-0 text-sm md:text-base">
          <AuthNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
