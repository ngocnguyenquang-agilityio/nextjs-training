'use client';

import Link from 'next/link';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button } from '@/components/Button';
import { FormControl } from '@/components/FormControl';

// Constants
import { REGEX } from '@/constants/regex';
import { API_ROUTER, PAGE_ROUTES } from '@/constants/routes';

// Services
import { createTech } from '@/services/fetcher';

interface IFormInput {
  name: string;
  logo: string;
}

export const CreateTechForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      logo: ''
    }
  });

  const { trigger, isMutating } = useSWRMutation(API_ROUTER.TECH_LIST, createTech);
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await trigger(data);
    router.push(PAGE_ROUTES.TECH_LIST);
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
                placeholder="Tech name"
                id="name"
                required
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
              <FormControl labelText="Logo URL" placeholder="https://avatar-link.com" id="logo" onChange={onChange} />
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
        <Button disabled={isMutating} type="submit">
          Create Tech
        </Button>
      </div>
    </form>
  );
};
