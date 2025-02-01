'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from "@prisma/client";
import { Select, Separator } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
    issue: Issue;
};

const AssigneeSelect = ({ issue }: Props) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios
            .get('/api/users')
            .then(res => res.data),
        staleTime: 60 * 1000, // 1 min
        retry: 3,
    });

    const [value, setValue] = useState<string | null>(issue.assignedToUserId ?? "null");

    const handleChange = async (userId: string) => {
        const newValue = userId === "null" ? null : userId;
        setValue(newValue);

        await axios
            .patch(
                `/api/issues/${issue.id}`,
                { assignedToUserId: newValue }
            )
            .catch( () => toast.error('Changes could not be saved') );

        //* either way will work
        // try {
        //     await axios.patch(`/xapi/issues/${issue.id}`, { assignedToUserId: newValue });
        // }
        // catch (error) {
        //     toast.error('Changes could not be saved');
        // }
    };

    if (isLoading) 
        return <Skeleton height='1.75rem' />;

    if (error)
        return null;

    return (
        <>    
            <Select.Root defaultValue={value || 'null'} onValueChange={handleChange}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Separator size='4' />
                        <Select.Item value='null'>Unassigned</Select.Item>
                        {
                            users?.map(user => 
                                <Select.Item 
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                </Select.Item>
                            )
                        }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

export default AssigneeSelect;
