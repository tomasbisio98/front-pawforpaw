import { getDogId } from "@/service/dogs";
import ProductsClient from "../../Components/ProductsClient";

// En Next.js 15, params es ahora un Promise.
// No necesitas definir un type separado; puedes tipar inline.
export default async function ProductosPorPerrito({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const dog = await getDogId(id);

  if (!dog) {
    return (
      <div className="p-6">
        <h1 className="text-red-500 text-xl font-bold">Perrito no encontrado</h1>
      </div>
    );
  }

  const perrito = {
    id: dog.dogId!,
    nombre: dog.name,
  };

  return <ProductsClient perrito={perrito} />;
}