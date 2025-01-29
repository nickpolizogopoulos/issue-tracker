import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { ArrowDownIcon } from '@radix-ui/react-icons';

type Props = {
    direction: 
          'left' 
        | 'right' 
        | 'up' 
        | 'down';
};

const ArrowIcon = ( {direction}: Props ) => {

    return (
          direction === 'left'  ? <ArrowLeftIcon /> 
        : direction === 'right' ? <ArrowRightIcon />
        : direction === 'up'    ? <ArrowUpIcon />
        : <ArrowDownIcon />
    );
};

export default ArrowIcon;