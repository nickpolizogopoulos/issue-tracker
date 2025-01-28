import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
    issueId: number;
};

const EditIssueButton = ( {issueId}: Props ) => {
  return (
    <Button asChild color="gray" variant="soft" highContrast>
        <Link href={`/issues/${issueId}/edit`}>
            <Pencil2Icon />
            Edit Issue
        </Link>
    </Button>
  );
};

export default EditIssueButton;