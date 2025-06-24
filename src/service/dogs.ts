import { IDogs } from "@/interface/IDogs";
import axios from "axios";


const axiosApiBack = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

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


export const getDogId = async (id:number):Promise<IDogs | null> => {
    try {
        const response = await axiosApiBack.get("/dogs/" + id)
        
        if(!response?.data){
            return null
        }
        return response.data
    } catch (error) {
        console.error("Ocurrio un error al obtener el perrito", error)
        return null
    }
};


export const createDog = async (dogData: Omit<IDogs, "id">): Promise<IDogs | null> => {
  try {
    const response = await axiosApiBack.post("/dogs", dogData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al crear perrito:", error);
    return null;
  }
};


export const updateDog = async (id: string, dogData: Partial<IDogs>): Promise<IDogs | null> => {
  try {
    const response = await axiosApiBack.put(`/dogs/${id}`, dogData);
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar perrito:", error);
    return null;
  }
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