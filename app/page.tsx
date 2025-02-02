import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";

export default async function Home() {

  const getIssues = (status: Status) => {
    return prisma.issue.count({
      where: {
        status: status
      }
    });
  };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary
          open={await getIssues('OPEN')}
          closed={await getIssues('CLOSED')}
          inProgress={await getIssues('IN_PROGRESS')}
        />
        <IssueChart 
          open={await getIssues('OPEN')}
          closed={await getIssues('CLOSED')}
          inProgress={await getIssues('IN_PROGRESS')}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
  
};