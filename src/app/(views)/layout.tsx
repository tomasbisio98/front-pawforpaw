'use client'
import React, { FC } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "./footer/page";
import useAdminOutOfPublic from "@/hooks/useAdminOutOfPublic";
interface LayoutViewsProps {
  children: React.ReactNode;
}

const LayoutViews: FC<LayoutViewsProps> = ({ children }) => {
  const protection = useAdminOutOfPublic() // 🔐

  if (protection) return protection;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutViews;
