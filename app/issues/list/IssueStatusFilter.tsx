'use client'; 

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

type Status = {
    label: string;
    value?: 'OPEN' | 'CLOSED' | 'IN_PROGRESS';
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
    const searchParams = useSearchParams();

    const handleChange = (status: string) => {

        const params = new URLSearchParams();

        if (status)
            params.append('status', status);

        if (searchParams.get('orderBy'))
            params.append('orderBy', searchParams.get('orderBy')!);

        const query = params.size ? `?${params.toString()}` : '';
        router.push(`/issues/list${query}`);
    };

    return (
        <Select.Root
            onValueChange={handleChange}
        >
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