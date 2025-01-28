import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type Props = {
    issueId: number;
}

const DeleteIssueButton = ( {issueId}: Props ) => {
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
          <AlertDialog.Action>
            <Button color='red'>Delete</Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>Cancel</Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;