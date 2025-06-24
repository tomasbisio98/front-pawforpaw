import React from "react";
import EdiPerritoForm from "@/app/(admin)/dashboard/Components/EdiPerritoForm";
import { getDogs } from "@/service/dogs"; // Asegúrate de importar getDogs

const getData = async () => {
  const dogs = await getDogs();
  return { dogs };
};

export default async function PerritosPage() {
  const { dogs } = await getData();

  return <EdiPerritoForm />;
}
