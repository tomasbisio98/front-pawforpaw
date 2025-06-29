"use server"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoginInput } from "@/interface/ILoginInput";
import { ISignupInput } from "@/interface/ISignupInput";
import axios from "axios";

const axiosApiBack = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
})

export const postRegister = async (data:ISignupInput) => {
    
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
