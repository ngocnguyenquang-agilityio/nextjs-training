'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button } from '@/components/Button';
import { FormControl } from '@/components/FormControl';

// Constants
import { REGEX } from '@/constants/regex';
import { API_ROUTER, PAGE_ROUTES } from '@/constants/routes';

// Services
import { fetcher } from '@/services/fetcher';

interface IFormInput {
  name: string;
  logo: string;
}

export const EditTechForm = ({ id }: { id: string }) => {
  const { data, isLoading } = useSWR(API_ROUTER.TECH_DETAIL(id), fetcher);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInput>({ values: data });

  // TODO: Implement TechForm skeleton
  if (isLoading)
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64" />
      </div>
    );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // TODO: Handle edit tech
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Name is required',
              pattern: { value: REGEX.NAME, message: 'Invalid name' }
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Tech name"
                id="name"
                required
                defaultValue={data.name}
                error={errors?.name ? true : false}
                errorText={errors?.name?.message}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="logo"
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Logo URL"
                placeholder="https://avatar-link.com"
                id="logo"
                defaultValue={data.logo || ''}
                onChange={onChange}
              />
            )}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={PAGE_ROUTES.TECH_LIST}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Tech</Button>
      </div>
    </form>
  );
};
