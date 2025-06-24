import React from "react";

// 1) Hacer la función async
export default async function ProductosPorPerrito({
  // 2) Indicar que params es una Promise
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 3) Await para obtener id
  const { id } = await params;

  // Ahora ya puedes usar id con normalidad
  const perrito = {
    id,
    nombre: "Milka", // más adelante reemplazarás con fetch por ID
  };

  return (
    <div>
      <h1>Detalle de Perrito #{perrito.id}</h1>
      <p>Nombre: {perrito.nombre}</p>
    </div>
  );
}

