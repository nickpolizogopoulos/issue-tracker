'use client';

import ArrowIcon from '@/app/components/ArrowIcon';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Button,
  Callout,
  Heading,
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

  const onSubmit = handleSubmit( async data => {
    try {
      setSubmitting(true);

      if (issue) 
        axios.patch(`/api/issues/${issue.id}`, data);
      else
        await axios.post('/api/issues', data);

      router.push('/issues');
      router.refresh();
    } 
    catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
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

        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {!isSubmitting && <ArrowIcon direction='up' />}
          {issue ? 'Update Issue' : 'Submit New Issue'}
        </Button>

      </form>
    </>

  );
};

export default IssueForm;