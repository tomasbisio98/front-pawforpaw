"use client"
import { IDogs } from "@/interface/IDogs";
import { Search } from "lucide-react";
import React, { FC, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Card from "../cards/Card";

interface DogsListProps {
  list: IDogs[];
}


const DogsList: FC<DogsListProps> = ({list}) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string>("")

  const normalizedSearch = search.toLowerCase().trim();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/; // Solo letras y espacios

  if (regex.test(value) || value === "") {
    setSearch(value);
  }
};

  const filterDogs = list
  .filter((dog) => (filter ? dog.sex === filter : true))
    .filter((dog) =>
      dog.name.toLowerCase().includes(normalizedSearch)
    );
  

  return (
    <div className="px-6">
        <div className="relative flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="px-3 py-2 pl-10 border rounded-md"
              value={search}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
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