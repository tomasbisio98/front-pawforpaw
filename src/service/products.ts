import { IProduct } from "@/interface/IProducts";
import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await axiosApiBack.get("/products"); 
  return response.data;
};

export const createProduct = async (
  productData: Omit<IProduct, "productId" | "status">
) => {
  try {
    const res = await axiosApiBack.post("/products", productData);
    return res.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const assignProductToDog = async (dogId: string, productId: string) => {
  try {
    const res = await axiosApiBack.patch(`/dogs/${dogId}/products`, {
      productIds: [productId],
    });
    return res.data;
  } catch (error) {
    console.error("Error asignando producto al perrito:", error);
    throw error;
  }
};