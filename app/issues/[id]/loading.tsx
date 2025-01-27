import {
  Box,
  Card,
  Flex
} from "@radix-ui/themes";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import BackToIssues from "../BackToIssues";

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <BackToIssues />
      <Skeleton />

      <Flex align='center' gap='3' my='3'>
          <Skeleton width='5rem' />
          <Skeleton width='8rem' />
      </Flex>

      <Card className='prose' mt='6'>
          <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;