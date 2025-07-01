"use client";

import { IUsers } from "@/interface/IUsers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: IUsers | null;
  isAuth: boolean | null;
  token?: string | null;

  // acciones
  saveUserData: (data: { user: IUsers; token: string }) => void;
  resetUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUsers | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // ✅ Guardar datos en localStorage
  const saveUserData = (data: { user: IUsers; token: string }) => {
    // ⚠️ Verificación previa
    if (typeof data.user !== "object" || data.user === null || !data.user.id) {
      console.error("❌ Datos inválidos al intentar guardar usuario:", data);
      throw new Error("Usuario inválido en la respuesta");
    }

    setUser(data.user);
    setToken(data.token);
    setIsAuth(true);
    localStorage.setItem("auth", JSON.stringify(data));
    console.log("🔐 Usuario autenticado:", data.user);
  };

  // ✅ Eliminar datos del almacenamiento local al cerrar sesión
  const resetUserData = () => {
    setUser(null);
    setToken(null);
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  // ✅ Recuperar sesión al recargar o volver a abrir
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (!stored) {
        setIsAuth(false);
        return;
      }

      const parsed = JSON.parse(stored);
      if (!parsed.user || !parsed.token) {
        setIsAuth(false);
        return;
      }

      setUser(parsed.user);
      setToken(parsed.token);
      setIsAuth(true);
    } catch (error) {
      console.error("⚠️ Error al recuperar sesión:", error);
      setIsAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuth,
        saveUserData,
        resetUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};
