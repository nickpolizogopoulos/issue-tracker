'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
    label: string,
    href: string
};

const NavBar = () => {

    const links: NavLink[] = [
        {
            label: 'Dashboard',
            href: '/'
        },
        {
            label: 'Issues',
            href: '/issues'
        }
    ];

    const currentPath = usePathname();

    return (
        <nav className="flex space-x-10 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <img src="/logo.svg" className="w-10" alt="Issue Tracker Logo" />
            </Link>
            <ul className="flex space-x-5">
                {
                    links.map( link => 
                        <Link 
                            key={link.href}
                            className={`
                                ${
                                    link.href === currentPath 
                                        ? 'underline decoration-2 underline-offset-4 text-zinc-700' 
                                        : 'text-zinc-500'
                                } 
                                hover:text-zinc-700 hover:underline decoration-2 underline-offset-4 transition-colors`
                            }
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    )
                }
            </ul>
        </nav>
    );
};

export default NavBar;