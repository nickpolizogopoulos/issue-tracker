'use client';
import { Box } from "@radix-ui/themes"
import { Skeleton } from '@/app/components';
import BackToIssues from "./BackToIssues"

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl gap-5'>
      <BackToIssues />
      <Skeleton width='7rem' height='1.2rem' />
      <Skeleton height='1.5rem' />
      <Skeleton height='20rem' />
    </Box>
  );
};

export default IssueFormSkeleton;