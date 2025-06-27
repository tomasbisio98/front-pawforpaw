import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const assignProductsToDog = async (dogId: string, productIds: string[]) => {
  try {
    const response = await axiosApiBack.patch(`/dogs/${dogId}/products`, {
      productIds,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error asignando productos:", error);
    throw error;
  }
};