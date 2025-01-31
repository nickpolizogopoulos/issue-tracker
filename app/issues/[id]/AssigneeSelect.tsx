'use client';

import { Skeleton } from '@/app/components';
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = () => {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => 
            axios
                .get('/api/users')
                .then( response => response.data ),
        staleTime: 60 * 1000, //1 min
        retry: 3,
    });

    if (isLoading)
        return <Skeleton height='1.75rem' />;

    if (error)
        return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {
                        users?.map( user => (
                            <Select.Item 
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </Select.Item>
                        ))

                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;