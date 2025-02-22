import { Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

const ErrorMessage = ( {children}: PropsWithChildren ) => {

  if (!children)
    return null;

  return (
    <Text color='red' as='p' className='italic'>
        {children}
    </Text>
  );
};

export default ErrorMessage;