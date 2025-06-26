'use client';

import Link from "next/link";
import { Dog, Package, Users } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Perritos",
    href: "/dashboard/perritos",
    icon: <Dog className="w-6 h-6 text-verdeClaro" />,
  },
  {
    title: "Donaciones",
    href: "/dashboard/donaciones",
    icon: <Package className="w-6 h-6 text-verdeClaro" />,
  },
  {
    title: "Usuarios",
    href: "/dashboard/usuarios",
    icon: <Users className="w-6 h-6 text-verdeClaro" />,
  },
];

export default function NavigationCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {navItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-blancoSuave hover:bg-blancoConVerde transition-colors p-4 rounded-2xl shadow-md text-center border border-verdeClaro"
        >
          <Link
            href={item.href}
            className="flex flex-col items-center justify-center"
          >
            {item.icon}
            <p className="mt-2 text-sm font-semibold text-verdeOscuro font-nunito">
              {item.title}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
