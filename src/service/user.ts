'use client';
import { IUsers } from "@/interface/IUsers";
import axios from "axios";

const axiosApiBack = axios.create({
    //la baseurl es lo que permite llamar por partes la url
    baseURL: process.env.NEXT_PUBLIC_EXPRESS_API, //si se usa el next public se llama al back al lado del cliente y eso estaria mal
})

export const getUser = async ():Promise<IUsers> =>{
    try {
        const token  = localStorage.getItem("token");
        
        const response = await axiosApiBack.get("/users/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },})
        // if(!response?.data){
        //     return []
        // }
        return response.data
    } catch (error) {
        console.error("Ocurrio un error al obtener los datos del usuario", error)
         throw Error("Error al obtener los datos")
    }

}