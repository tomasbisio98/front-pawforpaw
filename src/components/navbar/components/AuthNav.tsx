'use client';

import { routes } from "@/routes";
import NavList from "./NavList";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";

const AuthNav = () => {

    const authContext = useAuthContext();
    const {isAuth, user, resetUserData} = authContext;

     const logoutAction = () => {
        resetUserData();

        setTimeout(()=>{
            
            location.assign(routes.inicio)
        }, 500)
    }
    // console.log("authContext", authContext);
    
if(isAuth === null){
    return <div className="flex items-center justify-center ">
        <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>

}


    if(isAuth){
        return(
            <div className="flex items-center space-x-3">
                <Link href={routes.DashboardUser} className="text-white flex items-center space-x-2 hover:text-verdeSuave transition px-3 ">
                <span>{user?.name} </span>
                </Link>

                <p onClick={logoutAction} role="button" className="text-red-600 hover:text-red-800 transition"> cerrar sesión</p>
            </div>

        )
    }


    return (
        <div className="flex   gap-4 list-none px-6">
            <NavList href={routes.AuthPage}  name='Iniciar Sesión' /> 
            <NavList href={routes.AuthPage} name='Registro' /> 
        </div>
    )

}

export default AuthNav;