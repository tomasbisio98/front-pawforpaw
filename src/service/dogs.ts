import { IDogs } from "@/interface/IDogs";
import axiosApiBack from "@/lib/axiosApiBack";

export const getDogsFilter = async (filters?: {
  name?: string;
  gender?: string;
  city?: string;
  page?: number;
  limit?: number;
  sort?: string;
  status?: boolean; // 👈 añadimos status opcional
}): Promise<{ data: IDogs[]; total: number }> => {
  try {
    const params = new URLSearchParams();

    if (filters?.name) params.append("name", filters.name);
    if (filters?.gender) params.append("gender", filters.gender);
    if (filters?.city) params.append("city", filters.city);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.sort) params.append("sort", filters.sort);
    if (filters?.status !== undefined)
      params.append("status", String(filters.status)); // 👈 añadimos aquí

    const response = await axiosApiBack.get(`/dogs?${params.toString()}`);

    // Caso 1: response.data tiene forma { data: [], total: 12 }
    if (Array.isArray(response.data?.data)) {
      return {
        data: response.data.data,
        total: response.data.total || response.data.data.length || 0,
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

export const getDogs = async (): Promise<IDogs[]> => {
  try {
    const response = await axiosApiBack.get("/dogs");
    const data = response.data;

    return data;
  } catch (error) {
    console.error("❌ Error al obtener perritos:", error);
    return [];
  }
};

export const getDogId = async (
  id: string,
  onlyActiveProducts = false
): Promise<IDogs | null> => {
  try {
    const response = await axiosApiBack.get("/dogs/" + id, {
      params: {
        ...(onlyActiveProducts && { onlyActiveProducts: true }),
      },
    });

    if (!response?.data) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Ocurrió un error al obtener el perrito", error);
    return null;
  }
};

export const createDog = async (
  dogData: Omit<IDogs, "dogId">
): Promise<IDogs | null> => {
  try {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    const response = await axiosApiBack.post("/dogs", dogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al crear perrito:", error);
    return null;
  }
};

export const updateDog = async (
  id: string,
  dogData: Partial<IDogs>
): Promise<IDogs | null> => {
  try {
    console.log("📤 Enviando actualización del perrito:", { id, dogData });
    const response = await axiosApiBack.put(`dogs/${id}`, dogData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar perrito:", error);
    return null;
  }
};

export const assignProductsToDog = async (
  dogId: string,
  productIds: string[]
) => {
  const response = await axiosApiBack.patch(`/dogs/${dogId}/products`, {
    productIds,
  });
  return response.data;
};

// export const deleteDog = async (id: string): Promise<boolean> => {
//   try {
//     await axiosApiBack.delete(`/dogs/${id}`);
//     return true;
//   } catch (error) {
//     console.error("❌ Error al eliminar perrito:", error);
//     return false;
//   }
// };
