import { IDogs } from "@/interface/IDogs";
import axiosApiBack from "./axiosApiBack";

// Obtener todos los perritos con paginación
export const getDogsFilter = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{ data: IDogs[]; total: number }> => {
  const response = await axiosApiBack.get(`/dogs?page=${page}&limit=${limit}`);
  return response.data;
};


// Obtener perritos con filtros dinámicos
export const getDogsFiltered = async (filters?: {
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

    if (Array.isArray(response.data?.data)) {
      return {
        data: response.data.data,
        total: response.data.total || 0,
      };
    }

    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    return { data: [], total: 0 };
  } catch (error) {
    console.error("❌ Ocurrió un error al obtener los perritos", error);
    return { data: [], total: 0 };
  }
};

// Obtener todos los perritos (sin filtros)
export const getDogs = async (): Promise<IDogs[]> => {
  try {
    const response = await axiosApiBack.get("/dogs");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener perritos:", error);
    return [];
  }
};

// Obtener un perrito por ID
export const getDogId = async (id: string): Promise<IDogs | null> => {
  try {
    const response = await axiosApiBack.get("/dogs/" + id);
    return response?.data || null;
  } catch (error) {
    console.error("❌ Ocurrió un error al obtener el perrito:", error);
    return null;
  }
};

// Crear un nuevo perrito
export const createDog = async (
  dogData: Partial<IDogs>
): Promise<IDogs | null> => {
  try {
    const payload = {
      name: dogData.name?.trim(),
      sex: dogData.sex,
      city: dogData.city?.trim(),
      description: dogData.description?.trim(),
      ...(dogData.imgUrl && { imgUrl: dogData.imgUrl }),
      ...(dogData.status !== undefined && { status: dogData.status }),
    };

    const response = await axiosApiBack.post("/dogs", payload);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear perrito:", error);
    return null;
  }
};

// Actualizar un perrito existente
export const updateDog = async (
  id: string,
  dogData: Partial<IDogs>
): Promise<IDogs | null> => {
  try {
    console.log("📤 Enviando actualización del perrito:", { id, dogData });
    const response = await axiosApiBack.put(`/dogs/${id}`, dogData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar perrito:", error);
    return null;
  }
};

// Asignar productos a un perrito
export const assignProductsToDog = async (
  dogId: string,
  productIds: string[]
): Promise<IDogs> => {
  try {
    const response = await axiosApiBack.patch(`/dogs/${dogId}/products`, {
      productIds,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al asignar productos al perrito:", error);
    throw error;
  }
};
