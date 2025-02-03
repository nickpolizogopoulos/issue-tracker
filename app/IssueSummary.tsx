import { Status } from "@prisma/client";
import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
    open: number;
    inProgress: number;
    closed: number;
};

type StatusProps = {
    label: string;
    value: number;
    status: Status;
};

const IssueSummary = ( {open, inProgress, closed}: Props ) => {

    const containers: StatusProps[] = [
        {
            label: 'Open Issues',
            value: open,
            status: 'OPEN'
        },
        {
            label: 'Issues in Progress',
            value: inProgress,
            status: 'IN_PROGRESS'
        },
        {
            label: 'Closed Issues',
            value: closed,
            status: 'CLOSED'
        }
    ];

    return (
        <Flex
            gap='5'
            direction={{initial: 'column', sm: 'row'}}
            justify={{initial: 'center', md: 'between'}}
        >
            {
                containers.map( container => (
                    <Card key={container.label} className='hover:shadow-lg transition duration-250 ease-in-out'>
                        <Flex direction='column'>
                            <Link href={`/issues/list?status=${container.status}`}>
                                <Heading size='4'>
                                    {container.label}
                                    <Separator size='4' my='3' />
                                </Heading>
                            </Link>
                            <Text size='4'>
                                {container.value}
                            </Text>
                        </Flex>
                    </Card>
                ))
            }
        </Flex>
    );
};

export default IssueSummary;