'use client';

import ArrowIcon from '@/app/components/ArrowIcon';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, Status } from '@prisma/client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Button,
  Callout,
  Flex,
  Heading,
  Select,
  TextField
} from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Controller,
  useForm
} from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import BackToIssues from './BackToIssues';

type IssueFormData = z.infer<typeof issueSchema>;

type Props = {
  issue?: Issue
};

const IssueForm = ( {issue}: Props ) => {

  const {
    register, 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>();

  const handleStatusChange = (status: Status) => {
    setStatus(status);
  };

  const onSubmit = handleSubmit( async data => {
    try {
      setSubmitting(true);

      const payload = { ...data, status };

      if (issue) 
        await axios.patch(`/api/issues/${issue.id}`, payload);
      else
        await axios.post('/api/issues', payload);

      router.push('/issues/list');
      router.refresh();
    } 
    catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
      console.log(error);
    }
  });

  return (
    <>
      <BackToIssues />
      <form onSubmit={onSubmit} className='max-w-xl space-y-3'>

        <Heading className='text-gray-600'>
          {issue ? 'Update Issue' : 'New Issue'}
        </Heading>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register('title')}></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller 
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={ ({field}) => 
            <SimpleMDE placeholder="Description" { ...field } />
          }
        ></Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        {(errors.description?.message || errors.title?.message) && 
        <Callout.Root color='red'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error || 'Title and Description fields are required!'}</Callout.Text>
        </Callout.Root>}

        <Flex gap='4'>
          <Button disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {!isSubmitting && <ArrowIcon direction='up' />}
            {issue ? 'Update Issue' : 'Submit New Issue'}
          </Button>
          {
            issue &&            
            <Select.Root value={status} defaultValue={issue?.status} onValueChange={handleStatusChange}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="OPEN">Open</Select.Item>
                  <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                  <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          }
        </Flex>

      </form>
    </>

  );
};

export default IssueForm;