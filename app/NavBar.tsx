'use client';

import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
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
            href: '/issues/list'
        }
    ];
    
    const { status, data: session } = useSession();

    const currentPath = usePathname();

    return (
        <nav className="border-b mb-5 px-5 py-3 select-none">
            <Container>
                <Flex justify='between' align='center'>
                    <Flex align='center' gap='5'>
                        <Link href="/">
                            <img src="/logo.svg" className="w-10" alt="Issue Tracker Logo" />
                        </Link>
                        <ul className="flex space-x-5">
                                {
                                    links.map( link => 
                                        <li key={link.href}>
                                            <Link 
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
                                        </li>
                                    )
                                }
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && <Link href='/api/auth/signout'>Logout</Link>}
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;