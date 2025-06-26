'use client';
import { IUsers } from "@/interface/IUsers";
import axios from "axios";

const axiosApiBack = axios.create({
    //la baseurl es lo que permite llamar por partes la url
     baseURL: "https://back-pawforpaw-production.up.railway.app",
})

console.log("URL del backend:", process.env.NEXT_PUBLIC_EXPRESS_API);

// Obtener usuarios
export const getUser = async (): Promise<IUsers> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosApiBack.get("/users/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Ocurrió un error al obtener los datos del usuario", error);
    throw Error("Error al obtener los datos");
  }
};

// Bloquear usuario
export const blockUser = async (userId: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    await axiosApiBack.patch(`/users/${userId}/block`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error al bloquear el usuario:", error);
    throw new Error("No se pudo bloquear el usuario");
  }
};

// Actualizar status del usuario (PUT)
export const updateStatusUsuario = async (
  id: string,
  status: boolean
): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    await axiosApiBack.put(
      `/users/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    throw new Error("No se pudo actualizar el estado");
  }
};






export const getUserById = async (id: string, token: string): Promise<IUsers> => {
  
  try {
    console.log("📡 URL construida:", `https://back-pawforpaw-production.up.railway.app/users/${id}`);
console.log("🧠 ID:", id);
console.log("🔐 Token:", token);
    const response = await axiosApiBack.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("📞 URL construida:", `/users/${id}`);

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener usuario por ID:", error);
    throw new Error("No se pudo obtener el usuario");
  }
};


export const updateUserById = async (id: string, data: Partial<IUsers>, token: string): Promise<IUsers> => {
  try {
    console.log("🛠️ Enviando a la API:", {
  id,
  data,
  headers: { Authorization: `Bearer ${token}` },
});

    const response = await axiosApiBack.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al actualizar el usuario:", error);
    throw new Error("No se pudo actualizar el usuario");
  }
};

