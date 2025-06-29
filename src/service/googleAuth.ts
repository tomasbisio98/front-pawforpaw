"use server"
import { IUsers } from "@/interface/IUsers";
import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

const axiosApiBack = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
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
