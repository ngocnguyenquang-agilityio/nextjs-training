'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button } from '@/components/Button';
import { FormControl } from '@/components/FormControl';

// Constants
import { REGEX } from '@/constants/regex';
import { ENDPOINT, ROUTER } from '@/constants/route';

// Services
import { editUser, fetcher } from '@/services/fetcher';

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  entryDate: string;
  avatar: string;
}

export const EditUserForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading } = useSWR(`${ENDPOINT.USER}/${id}`, fetcher);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IFormInput>({ values: data });

  const { trigger, isMutating } = useSWRMutation(`${ENDPOINT.USER}/${id}`, editUser);

  // TODO: Implement UserForm skeleton
  if (isLoading)
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64" />
      </div>
    );

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await trigger(data);
    router.push(ROUTER.USER);
  };
  const newDate = new Date().toISOString().substring(0, 10);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-6">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-4">
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: 'First name is required',
                pattern: { value: REGEX.NAME, message: 'Invalid First name' }
              }}
              render={({ field: { onChange } }) => (
                <FormControl
                  labelText="First name"
                  placeholder="First name"
                  id="firstName"
                  required
                  defaultValue={data.firstName}
                  error={errors?.firstName ? true : false}
                  errorText={errors?.firstName?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: 'Last name is required',
                pattern: { value: REGEX.NAME, message: 'Invalid Last name' }
              }}
              render={({ field: { onChange } }) => (
                <FormControl
                  labelText="Last name"
                  placeholder="Last name"
                  id="lastName"
                  required
                  defaultValue={data.lastName}
                  error={errors?.lastName ? true : false}
                  errorText={errors?.lastName?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Phone is required',
              pattern: { value: REGEX.PHONE, message: 'Invalid Phone number' }
            }}
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Phone number"
                placeholder="123-456-7891"
                id="phone"
                required
                defaultValue={data.phone}
                error={errors?.phone ? true : false}
                errorText={errors?.phone?.message}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="dob"
            render={({ field: { onChange } }) => (
              <FormControl
                type="date"
                defaultValue={data.dob.substring(0, 10)}
                max={newDate}
                labelText="Date of Birth"
                id="dob"
                onChange={(e) => onChange(new Date(e.target.value).toISOString())}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="entryDate"
            render={({ field: { onChange } }) => (
              <FormControl
                type="date"
                defaultValue={data.entryDate.substring(0, 10)}
                min={data.entryDate.substring(0, 10)}
                labelText="Entry Date"
                id="entry-date"
                onChange={(e) => onChange(new Date(e.target.value).toISOString())}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange } }) => (
              <FormControl
                labelText="Avatar URL"
                placeholder="https://avatar-link.com"
                id="avatar"
                defaultValue={data.avatar || ''}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="mb-4">{/* TODO: Handle add techstacks to user */}</div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/users"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button disabled={isMutating} type="submit">
          Edit User
        </Button>
      </div>
    </form>
  );
};
