import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { loading: () => <IssueFormSkeleton /> }
);

type Props = {
  params: Promise<{
    id: string;
  }>
};

const EditIssuePage = async ( {params}: Props ) => {

  const issue = await prisma.issue.findUnique({
    where: {
      id: +(await params).id
    }
  });

  if (!issue)
    notFound();

  return (
    <IssueForm issue={issue} />
  );
};

export default EditIssuePage;