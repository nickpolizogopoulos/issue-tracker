'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from "@prisma/client";
import { Select, Separator } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from 'react';

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

    const handleChange = (userId: string) => {
        const newValue = userId === "null" ? null : userId;
        setValue(newValue);

        try {
            axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: newValue });
        }
        catch (error) {
            console.error("Failed to update assignee", error);
        }
    };

    if (isLoading) 
        return <Skeleton height='1.75rem' />;

    if (error)
        return null;

    return (
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
    );
};

export default AssigneeSelect;
