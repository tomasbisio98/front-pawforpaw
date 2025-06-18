import Card from "@/components/cards/Card";
import { IDogs } from "@/interface/IDogs";
import React, { FC } from "react";

interface DogsListProps {
  list: IDogs[];
}

const DogsList: FC<DogsListProps> = ({list}) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
        {list?.map((dog, idx) => (
          <Card key={idx} {...dog} />
        ))}
      </div>
  );
};

export default DogsList;