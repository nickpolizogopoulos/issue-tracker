'use client';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import {
    Button,
    Flex,
    Text
} from "@radix-ui/themes";
import {
    useRouter,
    useSearchParams
} from "next/navigation";
import { JSX } from "react";

type Props = {
    itemCount: number;
    pageSize: number;
    currentPage: number;
};

const Pagination = ( {itemCount, pageSize, currentPage}: Props ) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);

    if (pageCount <= 1)
        return null;

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    const buttons: Button[] = [
        {
            id: 1,
            disabled: currentPage === 1,
            changePage: 1,
            icon: <DoubleArrowLeftIcon />
        },
        {
            id: 2,
            disabled: currentPage === 1,
            changePage: currentPage - 1,
            icon: <ChevronLeftIcon />
        },
        {
            id: 3,
            disabled: currentPage === pageCount,
            changePage: currentPage + 1,
            icon: <ChevronRightIcon />
        },
        {
            id: 4,
            disabled: currentPage === pageCount,
            changePage: pageCount,
            icon: <DoubleArrowRightIcon />
        }
    ];

    return (
        <Flex align='center' justify='between'>
            <Flex gap='2'>
                {
                    buttons.map( button => 
                        <Button 
                            key={button.id}
                            variant='surface'
                            disabled={button.disabled}
                            onClick={() => changePage(button.changePage)}
                        >
                            {button.icon}
                        </Button>
                    )
                }
            </Flex>
            <Text size='3'>
                Page {currentPage} of {pageCount}
            </Text>
        </Flex>
    );
};

type Button = {
    id: number;
    disabled: boolean;
    changePage: number;
    icon: JSX.Element;
};

export default Pagination;