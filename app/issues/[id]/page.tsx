import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import BackToIssues from "../BackToIssues";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const IssueDetailPage = async ( {params}: Props ) => {

    if (typeof (await params).id !== 'number')
        notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt( (await params).id )
        }
    })

    if (!issue)
        notFound();

    return (
        <>
            <BackToIssues />
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </>
    );
};

export default IssueDetailPage;