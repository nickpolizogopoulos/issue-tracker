import { Table } from "@radix-ui/themes";
import { prisma }  from '@/prisma/client';
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

type Props = {
  searchParams: Promise<{
    status: Status;
  }>;
};

const IssuesPage = async ( {searchParams}: Props) => {

  const statuses = Object.values(Status);
  const resolvedSearchParams = await searchParams;
  const status = statuses.includes(resolvedSearchParams.status) ? resolvedSearchParams.status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status }
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { issues.map(issue =>
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
          )}
        </Table.Body>

      </Table.Root>
    </>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;