import React from "react";
import { PawPrint } from "lucide-react";

const topList = [
  { name: "🐶 Milka", amount: 6 },
  { name: "🥈 Felipe", amount: 4 },
  { name: "🥉 Nina", amount: 3 },
  { name: "🐾 Moco", amount: 2 },
  { name: "🐾 Roco", amount: 2 },
];

const TopFiveCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 border border-[#B4D9C4]">
      <div className="flex items-center gap-2 mb-4">
        <PawPrint className="text-[#2A5559]" />
        <h2 className="text-[#2A5559] font-semibold text-sm">
          TOP 5 Perritos con más productos donados
        </h2>
      </div>

      <ul className="space-y-2 text-[#593723] text-sm">
        {topList.map((dog, index) => (
          <li key={index} className="flex items-center justify-between">
            <span>{dog.name}</span>
            <span className="font-semibold">{dog.amount} productos</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopFiveCard;
