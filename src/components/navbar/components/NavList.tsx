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
                <Link href={href}  className="block px-3 py-2 text-white bg-[#2A5559] rounded-sm md:p-0 md:bg-transparent md:text-[#2A5559] hover:text-[#33A69A]" > {name}</Link>
            </li>

        </>
    )
}

export default NavList;