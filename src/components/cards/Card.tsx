/* eslint-disable @next/next/no-img-element */
import { IDogs } from "@/interface/IDogs";
import { routes } from "@/routes";
import Link from "next/link";
import { FC } from "react";



const Card: FC<IDogs> = (dog) => {
    const {
        name,
        sex,
        city,
        imgUrl,
       id
    } = dog;

    const getLinks = (name:string, id:IDogs["id"]) =>{
        return `${routes.dog_detail}/${id}/${name}`;
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 font-nunito hover:scale-105 transition">
            <Link href={getLinks(name, id)} >
                <img
                    src={imgUrl}
                    alt={`Foto de ${name}`}
                    className="w-full h-48 object-cover"
                    />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-verdeOscuro">{name}</h3>
                    <p className="text-sm text-marronOscuro mt-1">Género: {sex}</p>
                    <p className="text-sm text-marronOscuro">Ciudad: {city}</p>
                </div>
            </Link>
    </div>
    )
}

export default Card; 
