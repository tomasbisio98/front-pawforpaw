"use server"
import { IUsers } from "@/interface/IUsers";
import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

const axiosApiBack = axios.create({
    //la baseurl es lo que permite llamar por partes la url
    baseURL: process.env.EXPRESS_API, //si se usa el next public se llama al back al lado del cliente y eso estaria mal
})

export interface IGoogleAuthResponse {
  data: { user: IUsers; token: string; };
  user: IUsers;
  token: string;
}

export const postGoogleAuth = async (
  credentialResponse: CredentialResponse
): Promise<IGoogleAuthResponse> => {
  try {
    const idToken = credentialResponse.credential;
    if (!idToken) throw new Error("Token no recibido");

    const response = await axiosApiBack.post<IGoogleAuthResponse>("/auth/google", { idToken });

    return response.data;
  } catch (error) {
    console.error("Error autenticando con Google", error);
    throw new Error("error_google_auth");
  }
};
