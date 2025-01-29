import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
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

    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({}, {status: 401});

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

export const DELETE = async (
    request: NextRequest,
    {params}: Params
) => {

    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({}, {status: 401});

    const issue = await prisma.issue.findUnique({
        where: {
            id: +(await params).id
        }
    });

    if (!issue)
        return NextResponse.json({message: 'Issue not found'}, {status: 404});

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    });

    return NextResponse.json({});
};