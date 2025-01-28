import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import {
    NextRequest,
    NextResponse
} from "next/server";

type Params = {
    params: Promise<{
        id: string;
    }>
};

export const PATCH = async (
    request: NextRequest,
    {params}: Params
) => {

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400});

    const issue = await prisma.issue.findUnique({
        where: {
            id: +(await params).id
        }
    });

    if (!issue)
        return NextResponse.json({message: 'Issue not found'}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(updatedIssue);
};