import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import {
  Flex,
  Grid
} from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {

  const getIssues = (status: Status) => {
    return prisma.issue.count({
      where: {
        status: status
      }
    });
  };

  const issues = {
    open: await getIssues('OPEN'),
    closed: await getIssues('CLOSED'),
    inProgress: await getIssues('IN_PROGRESS'),
  };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary { ...issues } />
        <IssueChart { ...issues } />
      </Flex>
      <LatestIssues />
    </Grid>
  );
  
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues.'
};