"use client";
import { IUsers } from "@/interface/IUsers";
import axios from "axios";

const axiosApiBack = axios.create({
  //la baseurl es lo que permite llamar por partes la url
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API, //si se usa el next public se llama al back al lado del cliente y eso estaria mal
});

export const getUser = async (): Promise<IUsers> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosApiBack.get("/users/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // if(!response?.data){
    //     return []
    // }
    return response.data;
  } catch (error) {
    console.error("Ocurrio un error al obtener los datos del usuario", error);
    throw Error("Error al obtener los datos");
  }
};

// Obtener usuarios
export const getUser2 = async ({
  page = 1,
  limit = 15,
  orderBy = "name",
  order = "asc",
  status = "todos", // puede ser "activo", "inactivo", "todos"
}: {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
  status?: "activo" | "inactivo" | "todos";
}) => {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));
  params.append("orderBy", orderBy);
  params.append("order", order);

  if (status !== "todos") {
    params.append("status", status); // solo agrega si es activo o inactivo
  }

  const res = await axiosApiBack.get(`/users/list?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


// Bloquear usuario
export const blockUser2 = async (userId: string): Promise<void> => {
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
export const updateStatusUsuario2 = async (
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
