import { IDogs } from "@/interface/IDogs";
import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getDogs = async (filters?: {
  name?: string;
  gender?: string;
  city?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: IDogs[]; total: number }> => {
  try {
    const params = new URLSearchParams();

    if (filters?.name) params.append("name", filters.name);
    if (filters?.gender) params.append("gender", filters.gender);
    if (filters?.city) params.append("city", filters.city);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await axiosApiBack.get(`/dogs?${params.toString()}`);

    console.log("📥 Backend response completa:", response.data);

    // Caso 1: response.data tiene forma { data: [], total: 12 }
    if (Array.isArray(response.data?.data)) {
      return {
        data: response.data.data,
        total: response.data.total || 0,
      };
    }

    // Caso 2: response.data es directamente el array
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    // Cualquier otro caso inesperado
    return { data: [], total: 0 };
  } catch (error) {
    console.error("❌ Ocurrió un error al obtener los perritos", error);
    return { data: [], total: 0 };
  }
};