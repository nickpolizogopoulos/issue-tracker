'use client';

import {
  Heading,
  TextField,
  Callout,
  Button
} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { 
  useForm,
  Controller
} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import Link from 'next/link';
import ArrowIcon from '@/app/components/ArrowIcon';

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
      <Button asChild variant='soft'>
        <Link href={'/issues'}>
          <ArrowIcon direction='left' />
          Issues
        </Link>
      </Button>

      <form onSubmit={onSubmit} className='max-w-xl space-y-3 mt-5'>

        <Heading className='text-gray-600'>New Issue</Heading>
        <TextField.Root placeholder="Title" {...register('title')}></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller 
          name='description'
          control={control}
          render={ ({field}) => 
            <SimpleMDE placeholder="Description" {...field} />
        }
        >
        </Controller>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        
        {(errors.description?.message || errors.title?.message) && <Callout.Root color='red'>
          <Callout.Icon>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          </Callout.Icon>
          <Callout.Text>Title and Description fields are required!</Callout.Text>
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