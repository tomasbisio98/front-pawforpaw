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

  //acciones
  saveUserData: (data: { user: IUsers; token: string }) => void;
  resetUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>();
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<AuthContextType["isAuth"]>(null);

  const saveUserData = (data: { user: IUsers; token: string }) => {
    console.log("data", data);
    setUser(data.user);
    setIsAuth(true);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data));

    //persistir datos en localStorage
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token); // 🔥 ESTA LÍNEA
    console.log(
      "🔐 TOKEN guardado en localStorage:",
      localStorage.getItem("token")
    );
  };

  const resetUserData = () => {
    setUser(null);
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage?.getItem("user") || " {}");

    // estaba logueada y se desloguea
    if (storage === undefined || !Object.keys(storage)?.length) {
      setIsAuth(false);
      return;
    }
    const storageType = storage; //esto es para que no de error al acceder a las propiedades;

    setUser(storageType?.user);
    setIsAuth(true);
    setToken(storageType?.token);
  }, []);

<<<<<<< HEAD
  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isAuth,
        saveUserData,
        resetUserData,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
=======
    };

    useEffect(() => {
          try {
    const storage = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storage || !token) {
      setIsAuth(false);
      return;
    }

    const parsed = JSON.parse(storage);

    if (!parsed.user || !parsed.token) {
      setIsAuth(false);
      return;
    }

    setUser(parsed.user);
    setToken(parsed.token);
    setIsAuth(true);
  } catch (error) {
    console.error("Error al recuperar usuario:", error);
    setIsAuth(false); // 👈 Esto evita el spinner eterno
  }
    }, [])

    return (
        <AuthContext.Provider value={{
            user: user || null,
            isAuth,
            saveUserData,
            resetUserData,
            token,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
>>>>>>> 15779e69b66b17b0f42db0b16f267f4a28b2565a

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};
