'use client';
import { IUsers } from "@/interface/IUsers";
import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API,
});

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
