import { IUsers } from "@/interface/IUsers";
import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export interface IGoogleAuthResponse {
  user: IUsers;
  token: string;
}

export const postGoogleAuth = async (
  credentialResponse: CredentialResponse
): Promise<IGoogleAuthResponse> => {
  try {
    const idToken = credentialResponse.credential;
    if (!idToken) throw new Error("Token no recibido");

    const response = await axios.post<IGoogleAuthResponse>(
      "https://back-pawforpaw-production.up.railway.app/auth/google",
      { idToken }
    );

    return response.data;
  } catch (error) {
    console.error("Error autenticando con Google", error);
    throw new Error("error_google_auth");
  }
};
