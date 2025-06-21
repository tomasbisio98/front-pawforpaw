"use client";


import { useAuthContext } from "@/context/authContext";
import { postGoogleAuth } from "@/service/googleAuth";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const GoogleAuthButton = () => {
  const router = useRouter();
  const { saveUserData } = useAuthContext();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await postGoogleAuth(credentialResponse);
      console.log("👉 response de postGoogleAuth", res);

      saveUserData(res);
      toast.success("Bienvenido a PawForPaw");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (e) {
      console.warn("error al loguearse el usuario", e);
      toast.error("Email o contraseña incorrectos");
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Error al iniciar sesión con Google")}
      />
    </div>
  );
};

export default GoogleAuthButton;

