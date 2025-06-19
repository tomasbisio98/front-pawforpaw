import DogsList from "@/components/dogsList/DogsList";


import { getDogs } from "@/service/dogs";

const getData = async () => {
  const dogs = await getDogs();

  return {
  dogs
  }
}

const Perritos = async () => {
  const {dogs} = await getData();
  return (
    <main className="px-4 py-8 space-y-12 bg-blancoSuave">
      <h2 className="text-2xl text-center font-bold">Perritos</h2>
       <DogsList list={dogs}/>
    </main>
  );
};

export default Perritos;
