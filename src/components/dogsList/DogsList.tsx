"use client"
import Card from "@/components/cards/Card";
import { IDogs } from "@/interface/IDogs";
import React, { FC, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface DogsListProps {
  list: IDogs[];
}

const DogsList: FC<DogsListProps> = ({list}) => {

  const [filter, setFilter] = useState<string>("")
  const filterDogs = filter
  ? list.filter((dog)=> dog.sex === filter)
  : list;
console.log("Valores reales del sex:", list.map((d) => d.sex));

  return (
    <div className="px-6">
      <div className="flex justify-end pb-4 ">
      <div className="relative w-[180px]">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="appearance-none w-full bg-blancoConVerde  rounded-md px-4 py-2 text-sm text-green-900 shadow-md focus:outline-none focus:ring-0 focus:border-verdeOscuro transition"
    >
      <option value="">Todos los géneros</option>
      <option value="M">Masculino</option>
      <option value="H">Femenino</option>
    </select>

    {/* Ícono de flechita visible */}
    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-verdeOscuro text-xl">
      <FiChevronDown />
    </div>
  </div>
      
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-8">
        {filterDogs?.map((dog, idx) => (
          <Card key={idx} {...dog} />
        ))}
      </div>
    </div>
  );
};

export default DogsList;