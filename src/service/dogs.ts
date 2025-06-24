import { IDogs } from "@/interface/IDogs";
import axios from "axios";


const axiosApiBack = axios.create({
    //la baseurl es lo que permite llamar por partes la url
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

//dogs
export const getDogs = async ():Promise<IDogs[]> => {
    try {

        const response = await axiosApiBack.get("/dogs")
        if(!response?.data){
            return []
        }
        return response.data
    } catch (error) {
        console.error("Ocurrio un error al obtener los perritos", error)
        return []
    }
};