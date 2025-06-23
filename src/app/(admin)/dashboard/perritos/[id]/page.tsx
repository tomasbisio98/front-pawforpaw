import React from "react";
import ProductosTable from "../../components/ProductosTable";

export default async function ProductosPorPerrito({
  params,
}: {
  params: { id: string };
}) {
  // Simulación de datos
  const perrito = {
    id: params.id,
    nombre: "Milka", // Aquí puedes hacer fetch por ID más adelante
  };

  return <ProductosTable perrito={perrito} />;
}
