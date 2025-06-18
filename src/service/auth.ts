/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoginInput } from "@/interface/ILoginInput";
import { ISignupInput } from "@/interface/ISignupInput";
import axios from "axios";

const axiosApiBack = axios.create({
    //la baseurl es lo que permite llamar por partes la url
    baseURL: process.env.NEXT_PUBLIC_EXPRESS_API,
})

export const postRegister = async (data:ISignupInput) => {
    console.log("🚀 ENV baseURL:", process.env.NEXT_PUBLIC_EXPRESS_API);
    try {

       const response = await axiosApiBack.post("/auth/signup", data)
    //    if(!response.data){
    //     return
    //    }
        return "succes register";
    } catch (error) {
        console.error("Ocurrio un error al registrar al usuario", error)
        throw Error("error_register")
    }

};

export const postLogin = async (data:ILoginInput) => {
    try {
        console.log("📦 Datos enviados al backend:", data);
       const response = await axiosApiBack.post("/auth/signin", data)
    //    if(!response.data){
    //     return
    //    }
        return response.data;
    } catch (error) {
        console.error("Ocurrio un error al hacer el login el usuario", error)
        throw Error("Error en el Login")
    }
}