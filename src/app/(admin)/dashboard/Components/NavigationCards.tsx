"use client";

import Link from "next/link";
import { Dog, Package, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Perritos",
    href: "/dashboard/perritos",
    icon: Dog,
  },
  {
    title: "Donaciones",
    href: "/dashboard/donaciones",
    icon: Package,
  },
  {
    title: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
  },
];

export default function NavigationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      {navItems.map(({ title, href, icon: Icon }, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-verdeClaro bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <Link
            href={href}
            className="flex flex-col items-center justify-center text-center gap-1 px-3 py-4"
          >
            <div className="w-10 h-10 rounded-full bg-blancoConVerde flex items-center justify-center shadow-inner">
              <Icon className="w-5 h-5 text-verdeClaro" />
            </div>
            <p className="text-verdeOscuro font-semibold text-sm font-nunito">
              {title}
            </p>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              Ir a <ArrowRight className="w-4 h-4 text-verdeClaro" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
