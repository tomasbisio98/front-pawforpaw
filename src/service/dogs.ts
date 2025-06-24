import { IDogs } from "@/interface/IDogs";
import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Nuevo getDogs con filtros y paginación
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

    if (!response?.data) {
      return { data: [], total: 0 };
    }

    return response.data;
  } catch (error) {
    console.error("Ocurrió un error al obtener los perritos", error);
    return { data: [], total: 0 };
  }
};

// getDogId (sin cambios)
export const getDogId = async (id: string): Promise<IDogs | null> => {
  try {
    const response = await axiosApiBack.get("/dogs/" + id);

    if (!response?.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Ocurrió un error al obtener el perrito", error);
    return null;
  }
};
