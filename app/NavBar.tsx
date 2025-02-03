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
import Image from "next/image";
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
                            <Image src="/logo.svg" width={45} height={45} alt="Issue Tracker Logo" />
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
                            radius="full" 
                            fallback={
                                <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="8" r="4" fill="#222222"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 13C8.33033 13 5.32016 15.4204 5.02395 18.5004C4.99752 18.7753 5.22389 19 5.50003 19H18.5C18.7762 19 19.0025 18.7753 18.9761 18.5004C18.6799 15.4204 15.6697 13 12 13Z" fill="#2A4157" fillOpacity="0.24" />
                                </svg>
                             }
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