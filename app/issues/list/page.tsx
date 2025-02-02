import Pagination from "@/app/components/Pagination";
import { prisma } from '@/prisma/client';
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import
  IssueTable, 
  { 
    columnNames,
    IssueQuery
  } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

type Props = {
  searchParams: Promise<IssueQuery>;
};

const IssuesPage = async ( {searchParams}: Props) => {

  const statuses = Object.values(Status);
  const resolvedSearchParams = await searchParams;

  const status = statuses.includes(resolvedSearchParams.status) ? resolvedSearchParams.status : undefined;
  const where = { status };
  
  const orderBy = columnNames
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
    <Flex direction='column' gap='5'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;