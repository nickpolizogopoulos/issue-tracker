import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BackToIssues from '../BackToIssues';

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <BackToIssues />
      <Skeleton />
      <Skeleton height='2rem' />
      <Skeleton height='20rem' />
    </Box>
  );
};

export default LoadingNewIssuePage;