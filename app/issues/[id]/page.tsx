import { prisma } from "@/prisma/client";
import {
    Box,
    Flex,
    Grid
} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
        <Grid columns={ {initial: '1', sm: '5'} } gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction='column' gap='2'>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;