"use client";
import { IDogs } from "@/interface/IDogs";
import React, { FC } from "react";
import Card from "../cards/Card";

interface DogsListProps {
  list: IDogs[];
}

const DogsList: FC<DogsListProps> = ({ list }) => {
  return (
    <div className="px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-8">
        {list?.map((dog, idx) => (
          <Card key={idx} {...dog} />
        ))}
      </div>
    </div>
  );
};

export default DogsList;