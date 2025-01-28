'use client';

import ArrowIcon from '@/app/components/ArrowIcon';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
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
import dynamic from 'next/dynamic';
import { z } from 'zod';
import BackToIssues from '../BackToIssues';

const SimpleMDE = dynamic(() => 
  import('react-simplemde-editor'),
  { ssr: false }
);

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

  const {
    register, 
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = handleSubmit( async data => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
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

        <Heading className='text-gray-600'>New Issue</Heading>
        <TextField.Root placeholder="Title" {...register('title')}></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller 
          name='description'
          control={control}
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
          Submit New Issue
        </Button>

      </form>
    </>

  )
}

export default NewIssuePage;