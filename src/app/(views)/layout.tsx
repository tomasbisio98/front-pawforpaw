import React, { FC } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "./footer/page";
interface LayoutViewsProps {
  children: React.ReactNode;
}

const LayoutViews: FC<LayoutViewsProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutViews;
