'use client';

import { Spinner } from "@/app/components";
import {
  AlertDialog,
  Button,
  Flex
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    issueId: number;
}

const DeleteIssueButton = ( {issueId}: Props ) => {

  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.prefetch('/issues');
    }
    catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            {isDeleting && <Spinner />}
            Delete Issue
          </Button>
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
              <Button color='red' onClick={deleteIssue}>Delete</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title className='text-gray-600' weight='medium'>
            Error
          </AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted. Please try again.
          </AlertDialog.Description>
          <Button mt='4' color='gray' variant='soft' onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;