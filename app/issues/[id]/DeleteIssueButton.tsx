'use client';

import {
  AlertDialog,
  Button,
  Flex
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
    issueId: number;
}

const DeleteIssueButton = ( {issueId}: Props ) => {

  const router = useRouter();

  const onDeleteIssue = async () => {
    await axios.delete('/api/issues/' + issueId);
    router.push('/issues');
    router.prefetch('/issues');
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title className='text-gray-600' weight='medium'>
          Confirm Deletion
        </AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt='4' gap='2'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red' onClick={() => onDeleteIssue()}>Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;