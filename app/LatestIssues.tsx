import { prisma } from "@/prisma/client";
import {
    Avatar,
    Card,
    Flex,
    Heading,
    Table
} from "@radix-ui/themes";
import IssueStatusBadge from "./components/IssueStatusBadge";
import Link from "./components/Link";
import Image from "next/image";

const LatestIssues = async () => {

    const latestIssues = await prisma.issue.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
        include: {
            assignedToUser: true
        }
    });

    return (
        <Card size='3' className='hover:shadow-lg transition duration-250 ease-in-out'>
            <Heading mb='4' className='text-gray-600'>
                Latest Issues:
            </Heading>
            <Table.Root>
                <Table.Body>
                    {
                        latestIssues.map( issue => 
                            <Table.Row key={issue.id} className='hover:bg-gray-100'>
                                <Table.Cell>
                                    <Flex justify='between'>
                                        <Flex direction='column' align='start' gap='1'>
                                            <Link href={`/issues/${issue.id}`}>
                                                {issue.title}
                                            </Link>
                                            <IssueStatusBadge status={issue.status} />
                                        </Flex>
                                        {
                                            issue.assignedToUser
                                            && <Avatar
                                                src={issue.assignedToUser.image!}
                                                size='2'
                                                radius='full'
                                                fallback={ <Image src="user-icon.svg" width={100} height={100} alt="user" /> }
                                            />
                                        }
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues;