'use client';

import {
    Avatar,
    Box,
    Button,
    Container,
    DropdownMenu,
    Flex
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
    label: string,
    href: string
};

const NavBar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3 select-none">
            <Container>
                <Flex justify='between' align='center'>
                    <Flex align='center' gap='5'>
                        <Link href="/">
                            <img src="/logo.svg" className="w-10" alt="Issue Tracker Logo" />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    );
};


export const NavLinks = () => {
    const currentPath = usePathname();

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
    
    return (
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
    );
};



const AuthStatus = () => {

    const { status, data: session } = useSession();

    if (status === 'loading')
        return <Button variant="soft" disabled>Login</Button>;

    if (status === 'unauthenticated')
        return (
            <Link href='/api/auth/signin'>
                <Button variant="soft">Login</Button>
            </Link>
        );

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button className="select-none bg-transparent focus:outline-none focus:ring-0">
                        <Avatar 
                            referrerPolicy='no-referrer'
                            src={session!.user!.image!}
                            fallback="?"
                            radius="full" 
                        />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        {session!.user!.email}
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};

export default NavBar;