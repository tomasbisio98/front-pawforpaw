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
    console.log("authContext", authContext);
    
if(isAuth === null){
    return <div className="flex items-center justify-center  text-white">loading...</div>

}


    if(isAuth){
        return(
            <div>
                <Link href={routes.DashboardUser} className="text-white ">
                <span>{user?.name} </span>
                </Link>

                <p onClick={logoutAction} role="button" className="text-red-600 hover:text-red-800"> cerrar sesión</p>
            </div>

        )
    }


    return (
        <div>
            <NavList href={routes.AuthPage}  name='Iniciar Sesión' /> 
            <NavList href={routes.AuthPage} name='Registro' /> 
        </div>
    )

}

export default AuthNav;