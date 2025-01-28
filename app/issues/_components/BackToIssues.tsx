import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';

const BackToIssues = () => {
  return (
    <div className='mb-5'>
      <Button asChild variant='soft'>
          <Link href={'/issues'}>
            <ArrowIcon direction='left' />
            Issues
          </Link>
      </Button>
    </div>
  );
};

export default BackToIssues;