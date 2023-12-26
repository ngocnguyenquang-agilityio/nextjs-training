'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// Components
import { Button } from '@/components/Button';
import { FormControl } from '@/components/FormControl';
import { MultipleSelect } from '@/components/MultipleSelect';
import { Modal } from '@/components/Modal';

// Constants
import { REGEX } from '@/constants/regex';
import { API_ROUTER, PAGE_ROUTES } from '@/constants/routes';

// Services
import { putMethod, fetcher, deleteMethod } from '@/services/fetcher';

// Helpers
import { convertDateValue, getImageUrl } from '@/utils/helpers';

// Hooks
import { useModal } from '@/hooks/useModal';

// Types
import { Tech } from '@/interfaces/tech';
import Image from 'next/image';
import { DEFAULT_AVATAR } from '@/constants/avtart';

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  entryDate: string;
  avatar: string;
  techStacks: string[];
}

interface EditUserFormProps {
  id: string;
}

export const EditUserForm = ({ id }: EditUserFormProps) => {
  const { isShowModal, openModal, hideModal } = useModal();
  const router = useRouter();

  const { data: userData = {}, isLoading: isUserDataLoading } = useSWR(API_ROUTER.USER_DETAIL(id), fetcher);
  const { data: techData = [], isLoading: isTechDataLoading } = useSWR(API_ROUTER.TECH_LIST, fetcher);

  const [selectedData, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    if (!isUserDataLoading && userData) {
      setSelectedData(userData.techStacks);
    }
  }, [userData]);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty }
  } = useForm<IFormInput>({ values: userData });

  const [lastName, avatar] = watch(['lastName', 'avatar']);

  const { trigger: editUser, isMutating: isEditMutating } = useSWRMutation(API_ROUTER.USER_DETAIL(id), putMethod);
  const { trigger: deleteUser, isMutating: isDeleteMutating } = useSWRMutation(
    API_ROUTER.USER_DETAIL(id),
    deleteMethod
  );

  if (isUserDataLoading || isTechDataLoading) {
    return (
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  const options = techData
    .filter((item: Tech) => !selectedData.includes(item.id!))
    .map((option: Tech) => {
      return { ...option, image: option.logo };
    });

  const selectedOptions = techData.filter((item: Tech) => selectedData.includes(item.id!));

  const onSelect = (id: string) => {
    setSelectedData((prev: string[]) => [...prev, id]);
  };

  const onRemove = (id: string) => {
    setSelectedData((prev: string[]) => [...prev.filter((it) => it !== id)]);
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      hideModal();

      router.push(PAGE_ROUTES.USER_LIST);
    } catch {
      throw new Error('Something wrong when delete user');
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const newData = { ...data, techStacks: selectedData };

      await editUser(newData);
    } catch {
      throw new Error('Edit user failed!');
    }

    router.push(PAGE_ROUTES.USER_LIST);
  };
  const newDate = new Date().toISOString().substring(0, 10);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-6">
        <div className="grid md:grid-cols-2 md:gap-4">
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
                  defaultValue={userData.firstName}
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
                  defaultValue={userData.lastName}
                  error={errors?.lastName ? true : false}
                  errorText={errors?.lastName?.message}
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
                  defaultValue={userData.dob.substring(0, 10)}
                  max={newDate}
                  labelText="Date of Birth"
                  id="dob"
                  onChange={(e) => onChange(convertDateValue(e.target.value))}
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
                  defaultValue={userData.entryDate.substring(0, 10)}
                  min={userData.entryDate.substring(0, 10)}
                  labelText="Entry Date"
                  id="entry-date"
                  onChange={(e) => onChange(convertDateValue(e.target.value))}
                />
              )}
            />
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
                  defaultValue={userData.phone}
                  error={errors?.phone ? true : false}
                  errorText={errors?.phone?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="mb-4">
            <MultipleSelect
              id={`tech-stack-${id}`}
              label="Techstacks"
              options={options}
              selectedOptions={selectedOptions}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          </div>

          <div className="flex mb-4 items-end gap-4 col-span-2">
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange } }) => (
                <FormControl
                  className="w-full"
                  labelText="Avatar URL"
                  placeholder="https://avatar-link.com"
                  id="avatar"
                  defaultValue={userData.avatar || ''}
                  onChange={onChange}
                />
              )}
            />
            <Image
              className="border rounded-full content-center"
              src={avatar ? getImageUrl(lastName, avatar) : DEFAULT_AVATAR}
              alt="new-user-avatar"
              width={48}
              height={48}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={PAGE_ROUTES.USER_LIST}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Back
        </Link>
        <Button type="button" variant="danger" disabled={isDeleteMutating} onClick={openModal}>
          Delete
        </Button>
        <Button disabled={isEditMutating || !isDirty} type="submit">
          Save
        </Button>
        {isShowModal && (
          <Modal title="Delete User" content="Do you want to delete this user?" onClickHideModal={hideModal}>
            <Button type="button" variant="danger" disabled={isDeleteMutating} onClick={handleDelete}>
              Delete
            </Button>
          </Modal>
        )}
      </div>
    </form>
  );
};
