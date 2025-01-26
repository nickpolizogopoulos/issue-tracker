import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return (
    <>
      <div>Issues page</div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </>
  );
};

export default IssuesPage;