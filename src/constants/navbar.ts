import { NavListProps } from "@/components/navbar/components/NavList";
import { routes } from "@/routes";

export const navbarLi: NavListProps [] = [
    {
        name:"Inicio",
        href: routes.inicio
    },
    {
        name:"Perritos",
        href: routes.perritos
    },
    {
        name:"Historia",
        href: routes.Historia
    }
]