// import { getDogId } from "@/service/dogs";
// import ProductsClient from "../../Components/ProductsClient";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// export default async function ProductosPorPerrito({ params }: PageProps) {
//   const dog = await getDogId(params.id);

//   if (!dog) {
//     return (
//       <div className="p-6">
//         <h1 className="text-red-500 text-xl font-bold">Perrito no encontrado</h1>
//       </div>
//     );
//   }

//   const perrito = {
//     id: dog.dogId!,
//     nombre: dog.name,
//   };

//   return <ProductsClient perrito={perrito} />;
// }

export default function PlaceholderPage() {
  return null;
}