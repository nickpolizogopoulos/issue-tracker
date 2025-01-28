import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import {
    Card,
    Flex,
    Heading,
    Text
} from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import BackToIssues from "../BackToIssues";

type Props = {
    issue: Issue
};

const IssueDetails = ( {issue}: Props ) => {
  return (
    <>
        <BackToIssues />
        <Heading className='text-gray-600'>
            {issue.title}
        </Heading>

        <Flex align='center' gap='3' my='3'>
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card className='prose' mt='6'>
            <ReactMarkdown className='py-1'>{issue.description}</ReactMarkdown>
        </Card>
    </>
  );
};

export default IssueDetails;