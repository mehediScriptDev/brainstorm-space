"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({href,name}) => {
    const pathname = usePathname();
    return (
        <div>
           <Link className={pathname=== href? "border-b-2 border-custom":""} href={href}>{name}</Link> 
        </div>
    );
};

export default NavLink;