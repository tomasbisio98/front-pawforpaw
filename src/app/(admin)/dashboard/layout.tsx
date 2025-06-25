// app/(admin)/dashboard/layout.tsx
import React from "react";
import AdminNavbar from "@/components/navbar/AdminNavbar"; // Asegúrate de que este componente exista

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    

    <div className="min-h-screen flex flex-col bg-[#F2F2F0]">
      <AdminNavbar />
      <main className="flex-1 p-6">{children}</main>
    </div>

  );
}
