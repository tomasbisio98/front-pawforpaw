"use client";

import { useEffect, useState } from "react";
import DogsList from "@/components/dogsList/DogsList";
import { getDogsFilter } from "@/service/dogs";
import FiltroPerritos from "@/components/filters/filtroPerritos";
import { IDogs } from "@/interface/IDogs";
import clsx from "clsx";

const Perritos = () => {
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    city: "",
    page: 1,
    limit: 9,
    sort: "", // ✅ añadido para manejar el orden
    status: true, // o false, según el valor por defecto deseado
  });

  const [dogs, setDogs] = useState<IDogs[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data, total } = await getDogsFilter(filters);
      setDogs(data);
      setTotal(total);
    };

    fetchDogs();
  }, [filters]);

  return (
    <main className="px-4 py-8 space-y-8 bg-blancoSuave">
      <h2 className="text-2xl text-center font-bold">Perritos</h2>

      {/* ✅ Filtro con selector de orden integrado */}
      <FiltroPerritos filters={filters} setFilters={setFilters} />

      <div className="flex justify-center">
        <DogsList list={dogs} />
      </div>

      <div className="flex justify-center gap-4 items-center text-sm">
        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: Math.max(1, prev.page - 1),
            }))
          }
          disabled={filters.page === 1}
          className={clsx(
            "px-3 py-1 rounded font-medium text-sm transition-all",
            filters.page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#2A5559] text-white hover:bg-[#1d3e3e]"
          )}
        >
          Anterior
        </button>

        <span className="text-[#2A5559] font-semibold text-sm">
          Página {filters.page} de {Math.ceil(total / filters.limit) || 1}
        </span>

        <button
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
          disabled={filters.page >= Math.ceil(total / filters.limit)}
          className={clsx(
            "px-3 py-1 rounded font-medium text-sm transition-all",
            filters.page >= Math.ceil(total / filters.limit)
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#2A5559] text-white hover:bg-[#1d3e3e]"
          )}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
};

export default Perritos;
