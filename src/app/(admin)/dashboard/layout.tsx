import React, { FC } from "react";
import AdminNavbar from "@/components/navbar/AdminNavbar";
interface LayoutViewsProps {
  children: React.ReactNode;
}

const LayoutViews: FC<LayoutViewsProps> = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      {children}
    
    </>
  );
};

export default LayoutViews;