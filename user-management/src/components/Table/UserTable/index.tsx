'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';

// Components
import { Button } from '@/components/Button';
import { Pagination } from '@/components/Pagination';
import { PaginationSkeleton, UserTableSkeleton } from '@/components/Skeleton';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Types
import { User } from '@/interfaces/user';

// Services
import { deleteMethod, fetcher } from '@/services/fetcher';

// Constants
import { API_ROUTER } from '@/constants/routes';
import { LIMIT_DEFAULT } from '@/constants/pagination';

// Helpers
import { getImageUrl, getTotalPages } from '@/utils/helpers';

export const UserTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { data: totalData, isLoading: totalDataLoading } = useSWR(API_ROUTER.USER_LIST, fetcher);
  const { data, isLoading, mutate } = useSWR(`${API_ROUTER.USER_LIST}?page=${page}&limit=${LIMIT_DEFAULT}`, fetcher);

  if (isLoading) return <UserTableSkeleton />;

  const handleDelete = async (id: string) => {
    const newData = data.filter((item: User) => item.id !== id);
    try {
      await deleteMethod(API_ROUTER.USER_DETAIL(id));
      await mutate(newData);

      // TODO: Implement toast
      alert(`Deleted item ${id}`);
    } catch {
      throw new Error('Something wrong when delete user');
    }
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
                    src={getImageUrl(lastName, avatar)}
                    className="rounded-full"
                    width={28}
                    height={28}
                  />
                  <p
                    className="hover:underline hover:cursor-pointer"
                    onClick={() => router.push(`/users/${id}/details`)}
                  >
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
                    href={`/users/${id}/edit`}
                    className="group rounded-md border p-2 hover:bg-blue-400"
                    data-testid={`edit-${id}`}
                  >
                    <PencilIcon className="w-5 group-hover:text-white" />
                  </Link>
                  <Button
                    variant="outlineSecondary"
                    size="sm"
                    className="group hover:bg-red-400"
                    onClick={() => handleDelete(id!)}
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

      {totalDataLoading ? (
        <PaginationSkeleton />
      ) : (
        <div className="mt-3 flex w-full justify-center">
          <Pagination totalPages={getTotalPages(totalData.length, LIMIT_DEFAULT)} />
        </div>
      )}
    </div>
  );
};
