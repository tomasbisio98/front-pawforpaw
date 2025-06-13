import React, { FC } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "./footer/page";
interface LayoutViewsProps {
  children: React.ReactNode;
}

const LayoutViews: FC<LayoutViewsProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LayoutViews;
