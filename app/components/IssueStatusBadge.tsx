import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes"

type Props = {
    status: Status;
};

type BadgeColors = 'red' | 'orange' | 'green';

const statusMap: Record<
    Status, 
    { label: string; color: BadgeColors; }
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'orange' },
    CLOSED: { label: 'Closed', color: 'green' }
};

const IssueStatusBadge = ( { status }: Props ) => {
    
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    );
};

export default IssueStatusBadge;