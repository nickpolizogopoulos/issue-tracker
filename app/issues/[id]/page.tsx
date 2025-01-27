import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import BackToIssues from "../BackToIssues";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const IssueDetailPage = async ( {params}: Props ) => {

    const issue = await prisma.issue.findUnique({
        where: {
            id: +(await params).id
        }
    })

    if (!issue)
        notFound();

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

            <Card>
                <p className="italic">{issue.description}</p>
            </Card>
        </>
    );
};

export default IssueDetailPage;