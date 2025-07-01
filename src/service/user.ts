/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IUsers } from "@/interface/IUsers";
import axios from "axios";
import { IUsers2 } from "@/interface/IUsers2";

const axiosApiBack = axios.create({
  //la baseurl es lo que permite llamar por partes la url
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

console.log("URL del backend:", process.env.NEXT_PUBLIC_API_URL);

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

export const getUserById = async (
  id: string,
  token: string
): Promise<IUsers> => {
  try {
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

export const updateUserById = async (
  id: string,
  data: Partial<IUsers>,
  token: string
): Promise<IUsers> => {
  try {
    // 🔧 LIMPIAR CAMPOS INVÁLIDOS O VACÍOS
    const cleanData: Partial<IUsers> = {};
    if (data.name && data.name.trim() !== "") cleanData.name = data.name;
    if (typeof data.phone === "string") cleanData.phone = data.phone;
    if (typeof data.status === "boolean") cleanData.status = data.status;
    if (
      typeof data.profileImgUrl === "string" &&
      data.profileImgUrl.trim() !== ""
    )
      cleanData.profileImgUrl = data.profileImgUrl;

    console.log("🛠️ Enviando a la API:", {
      id,
      data: cleanData,
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await axiosApiBack.put(`/users/${id}`, cleanData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Detalle del error:",
      JSON.stringify(error?.response?.data, null, 2)
    );
    throw new Error("No se pudo actualizar el usuario");
  }
};

export const getUser2 = async (params: {
  page: number;
  limit: number;
  orderBy: string;
  order: string;
  status?: string;
}): Promise<{ data: IUsers2[]; total: number }> => {
  try {
    const token = localStorage.getItem("token");

    const query = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      orderBy: params.orderBy,
      order: params.order,
    });

    if (params.status) {
      query.append("status", params.status);
    }

    const response = await axiosApiBack.get(`/users/list?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // El backend retorna directamente un array, así que:
    const data = response.data;
    const total = data.length; // opcionalmente ajustable

    return { data, total };
  } catch (error) {
    console.error("❌ Error en getUser2:", error);
    throw new Error("No se pudo obtener la lista de usuarios");
  }
};
