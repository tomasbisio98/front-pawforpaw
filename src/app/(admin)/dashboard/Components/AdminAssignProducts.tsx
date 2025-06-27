import { useEffect, useState } from "react";
import { assignProductsToDog } from "@/service/dogs";
import { getAllProducts } from "@/service/products";
import { IProducts } from "@/interface/IProducts";

interface Props {
    dogId: string;
    onAssignSuccess?: () => void;
}

export default function AssignProducts({ dogId, onAssignSuccess }: Props) {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();

            setProducts(data);
        };
        fetchProducts();
    }, []);

    const toggleProduct = (id: string) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleAssign = async () => {
        console.log("Asignando productos..."); // 👈 Verificá si esto se muestra en la consola

        try {
            await assignProductsToDog(dogId, selectedProducts);
            alert("Productos asignados correctamente.");
            onAssignSuccess?.();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            alert("Error al asignar productos.");
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold">Asignar productos</h2>
            <ul className="my-4">
                {products.map((p) => (
                    <li key={p.productId}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedProducts.includes(p.productId)}
                                onChange={() => toggleProduct(p.productId)}
                            />
                            {p.name}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={handleAssign} className="bg-blue-600 text-white px-4 py-2 rounded">
                Asignar
            </button>
        </div>
    );
}

