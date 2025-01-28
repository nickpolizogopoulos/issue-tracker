import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Pencil2Icon } from '@radix-ui/react-icons';
import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    Text
} from "@radix-ui/themes";
import Link from 'next/link';
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import BackToIssues from "../BackToIssues";

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
    });

    if (!issue)
        notFound();

    return (
        <Grid columns={ {initial: '1', md: '2'} } gap='5'>
            <Box>    
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
            </Box>
            <Box>
            <Button asChild variant='outline'>
                <Link href={`/issues/${issue.id}/edit`}>
                    <Pencil2Icon />
                    Edit Issue
                </Link>
            </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;