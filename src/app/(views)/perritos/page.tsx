import DogsList from "@/components/dogsList/DogsList";

import { getDogs } from "@/service/dogs";

const getData = async () => {
  const dogs = await getDogs();

  return {
    dogs,
  };
};

const Perritos = async () => {
  const { dogs } = await getData();
  return (
    <main className="px-4 py-8 space-y-8 bg-blancoSuave">
      <h2 className="text-2xl text-center font-bold">Perritos</h2>
      <div className="flex justify-center">
       <DogsList list={dogs}/>
      </div>
    </main>
  );
};

export default Perritos;
