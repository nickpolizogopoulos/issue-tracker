import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
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
    { params }: Params
) => {

    const session = await getServerSession(authOptions);

    if (!session)
        return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const { assignedToUserId, title, description, status } = body;

    const validStatuses: Status[] = ['OPEN', 'IN_PROGRESS', 'CLOSED'];
    if (status && !validStatuses.includes(status)) {
        return NextResponse.json(
            { error: "Invalid status value" },
            { status: 400 }
        );
    }

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId }
        });

        if (!user)
            return NextResponse.json(
                { error: "Invalid user" },
                { status: 400 }
            );
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt((await params).id)
        }
    });

    if (!issue)
        return NextResponse.json(
            { message: "Issue not found" },
            { status: 404 }
        );

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId,
            ...(status && { status }) // Only update if status is provided
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