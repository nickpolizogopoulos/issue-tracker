'use client'; 

import { Select } from "@radix-ui/themes";
import { Status as PrismaStatus } from '@prisma/client';
import { useRouter } from "next/navigation";

type Status = {
    label: string;
    value?: 'OPEN' | 'CLOSED' | 'IN_PROGRESS'
}

const statuses: Status[] = [
    {
        label: 'All Issues'
    },
    {
        label: 'Open',
        value: 'OPEN'
    },
    {
        label: 'In Progress',
        value: 'IN_PROGRESS'
    },
    {
        label: 'Closed',
        value: 'CLOSED'
    }
];

const IssueStatusFilter = () => {

    const router = useRouter();

    const handleChange = (status: string) => {
        const query = status ? `?status=${status}` : ''
        router.push(`/issues/list${query}`);
    };

    return (
        <Select.Root onValueChange={handleChange}>
            <Select.Trigger />
            <Select.Content>
                {
                    statuses.map( status => 
                        <Select.Item 
                            key={status.value ?? status.label}
                            value={status.value!}
                        >
                            {status.label}
                        </Select.Item>)
                }
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;