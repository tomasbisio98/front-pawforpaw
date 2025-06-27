import { getDogId } from "@/service/dogs";
import ProductsClient from "../../Components/ProductsClient";

export default async function ProductosPorPerrito(props: {
  params: { id: string };
}) {
  const id = props.params.id;
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