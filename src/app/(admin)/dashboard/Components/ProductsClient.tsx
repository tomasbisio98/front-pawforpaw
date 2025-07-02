"use client";

import { useState } from "react";
import ProductTable from "./ProductosTable";

interface Props {
    perrito: {
        id: string;
        nombre: string;
    };
}

export default function ProductsClient({ perrito }: Props) {
    const [refreshKey] = useState(0);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{perrito.nombre}</h1>

            <ProductTable perrito={perrito} refreshKey={refreshKey} />

        </div>
    );
}
