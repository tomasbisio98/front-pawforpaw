import React from "react";
import ProductosTable from "@/app/(admin)/dashboard/Components/ProductosTable";

export default async function ProductosPorPerrito({
  params,
}: {
  params: { id: string };
}) {
  const perrito = {
    id: params.id,
    nombre: "Milka", // Luego reemplazar con fetch por ID
  };

  return <ProductosTable perrito={perrito} />;
}
