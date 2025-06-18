import DogsList from "@/components/dogsList/DogsList";
import { dogs } from "@/helpers/dogs";


const Perritos = () => {
  return (
    <main className="px-4 py-8 space-y-12 bg-blancoSuave">
      <h2 className="text-2xl text-center font-bold">Perritos</h2>
       <DogsList list={dogs}/>
    </main>
  );
};

export default Perritos;
