"use client";

import { useState } from "react";
import ProductTable from "./ProductosTable";
import AssignProducts from "./AdminAssignProducts";

interface Props {
    perrito: {
        id: string;
        nombre: string;
    };
}

export default function ProductsClient({ perrito }: Props) {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => setRefreshKey((prev) => prev + 1);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{perrito.nombre}</h1>

            <ProductTable perrito={perrito} refreshKey={refreshKey} />

            <div className="mt-8">
                <AssignProducts dogId={perrito.id} onAssignSuccess={handleRefresh} />
            </div>
        </div>
    );
}
