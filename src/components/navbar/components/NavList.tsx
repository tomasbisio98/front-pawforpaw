import Link from "next/link";
import { FC } from "react";

export interface NavListProps {
    name:string,
    href:string,

}


const NavList:FC<NavListProps> = ({name, href})=> {
    return (
        <>
            <li>
                <Link href={href}  className="block px-3 py-2 text-white  hover:text-verdeSuave transition" > {name}</Link>
            </li>

        </>
    )
}

export default NavList;