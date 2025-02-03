import {
    IssueStatusBadge,
    Link
} from "@/app/components";
import { prisma } from "@/prisma/client";
import {
    Issue,
    Status
} from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

export type IssueQuery = {
    status: Status;
    orderBy: keyof Issue;
    page: string;
};

type Props = {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
};

const IssueTable = async ( {searchParams, issues}: Props ) => {

    const resolvedSearchParams = await searchParams;

    return (
        <Table.Root variant='surface'>
            <Table.Header>
            <Table.Row>
                {
                tableColumns.map( column => 
                    <Table.ColumnHeaderCell key={column.value} className={column.classes}>
                    <NextLink href={{
                        query: { ...resolvedSearchParams, orderBy: column.value }
                    }}>
                        {column.label}
                    </NextLink>

                    {column.value === resolvedSearchParams.orderBy && <ArrowUpIcon className="inline" /> }

                    </Table.ColumnHeaderCell>
                )
                }
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {
                issues.map( issue =>
                <Table.Row key={issue.id} className="hover:bg-gray-100">
                    <Table.Cell>
                    <Link href={`/issues/${issue.id}`}>
                        {issue.title}
                    </Link>
                    <div className='block md:hidden'>
                        <IssueStatusBadge status={issue.status} />
                    </div>
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>
                    <IssueStatusBadge status={issue.status} />
                    </Table.Cell>
                    <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
                )
            }
            </Table.Body>
        </Table.Root>
    );
};

type Column = {
    label: string;
    value: keyof Issue;
    classes?: string;
};

const tableColumns: Column[] = [
    {
        label: 'Issue',
        value: 'title'
    },
    {
        label: 'Status',
        value: 'status',
        classes: 'hidden md:table-cell'
    },
    {
        label: 'Created at',
        value: 'createdAt',
        classes: 'hidden md:table-cell'
    }
];

export const columnNames = tableColumns.map( column => column.value );

export default IssueTable;