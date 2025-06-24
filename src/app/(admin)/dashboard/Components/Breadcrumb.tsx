import React from "react";
import Link from "next/link";

const Breadcrumb = () => {
  const links = [
    { emoji: "📊", label: "Dashboard", href: "/dashboard" },
    { emoji: "🐶", label: "Perritos", href: "/dashboard/perritos" },
    { emoji: "🧾", label: "Donaciones", href: "/dashboard/donaciones" },
    { emoji: "👥", label: "Usuarios", href: "/dashboard/usuarios" },
  ];

  return (
    <nav className="flex flex-wrap gap-3 mb-6">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#B4D9C4] text-sm font-medium text-[#2A5559] hover:bg-[#B4D9C4] hover:text-white transition-colors"
        >
          <span>{link.emoji}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Breadcrumb;
