'use client';

import React from 'react';
import { Search, MapPin, Users } from 'lucide-react';

interface Filters {
  name: string;
  gender: string;
  city: string;
  page: number;
  limit: number;
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FiltroPerritos = ({ filters, setFilters }: Props) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 items-center mb-6">
      {/* Nombre */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="pl-10 pr-4 py-2 w-52 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-verdeOscuro text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 ease-in-out focus:shadow-md"
        />
      </div>

      {/* Género */}
      <div className="relative">
        <Users className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <select
          name="gender"
          value={filters.gender}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 w-52 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-verdeOscuro text-sm text-gray-700 transition-all duration-200 ease-in-out focus:shadow-md"
        >
          <option value="">Todos</option>
          <option value="M">Macho</option>
          <option value="H">Hembra</option>
        </select>
      </div>

      {/* Ciudad */}
      <div className="relative">
        <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={handleChange}
          placeholder="Ciudad"
          className="pl-10 pr-4 py-2 w-52 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-verdeOscuro text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 ease-in-out focus:shadow-md"
        />
      </div>
    </div>
  );
};

export default FiltroPerritos;