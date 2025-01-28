import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';
import BackToIssues from '../_components/BackToIssues';

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <BackToIssues />
      <Skeleton width='7rem' height='1.2rem' />
      <Skeleton height='1.5rem' />
      <Skeleton height='20rem' />
    </Box>
  );
};

export default LoadingNewIssuePage;