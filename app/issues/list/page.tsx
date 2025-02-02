import { Table } from "@radix-ui/themes";
import { prisma }  from '@/prisma/client';
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

type Props = {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }>;

};

type Column = {
  label: string;
  value: keyof Issue;
  classes?: string;
};

const IssuesPage = async ( {searchParams}: Props) => {

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

  const statuses = Object.values(Status);
  const resolvedSearchParams = await searchParams;

  const status = statuses.includes(resolvedSearchParams.status) ? resolvedSearchParams.status : undefined;
  const where = { status };
  
  const orderBy = tableColumns
    .map( column => column.value )
    .includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where
  });

  return (
    <>
      <IssueActions />
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;