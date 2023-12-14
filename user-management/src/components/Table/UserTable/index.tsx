'use client';

import { SyntheticEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';

// Components
import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import { UserTableSkeleton } from '@/components/Skeleton';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Types
import { User } from '@/interfaces/user';

// Services
import { fetcher } from '@/services/fetcher';

// Constants
import { API_ROUTER } from '@/constants/routes';

export const UserTable = () => {
  const { data, isLoading } = useSWR(API_ROUTER.USER_LIST, fetcher);

  const getDefaultAvatar = (firstName: string, lastName: string) => {
    const defaultAvatar = `https://ui-avatars.com/api/?name=${lastName}+${firstName}&rounded=true&background=random&size=28`;

    return defaultAvatar;
  };

  if (isLoading) return <UserTableSkeleton />;

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    //TODO: Handle delete item

    alert('Delete button clicked!'); //Remove later
  };

  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              DoB
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Entry date
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map(({ id, firstName, lastName, dob, phone, entryDate, avatar }: User) => (
            <tr key={id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 focus:bg-gray-300">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Image
                    alt={`${lastName} avatar`}
                    src={avatar ? avatar : getDefaultAvatar(firstName, lastName)}
                    className="rounded-full"
                    width={28}
                    height={28}
                  />
                  <p>
                    {lastName} {firstName}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">{dob.substring(0, 10)}</td>
              <td className="px-6 py-4">{phone}</td>
              <td className="px-6 py-4">{entryDate.substring(0, 10)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <Link
                    href={`/users/${id}`}
                    className="group rounded-md border p-2 hover:bg-blue-400"
                    data-testid={`edit-${id}`}
                  >
                    <PencilIcon className="w-5 group-hover:text-white" />
                  </Link>
                  <Button
                    variant="outlineSecondary"
                    size="sm"
                    className="group hover:bg-red-400"
                    onClick={handleDelete}
                    data-testid={`delete-${id}`}
                  >
                    <TrashIcon className="w-5 group-hover:text-white" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 5 && (
        <div className="mt-3 flex w-full justify-center">
          {/* TODO: Handle pagination  */}
          <Pagination totalPages={4} standingPage="1" />
        </div>
      )}
    </div>
  );
};
