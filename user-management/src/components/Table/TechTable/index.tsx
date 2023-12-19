'use client';

import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';

// Components
import { Button } from '@/components/Button';
import { TechTableSkeleton } from '@/components/Skeleton';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Constants
import { API_ROUTER, PAGE_ROUTES } from '@/constants/routes';

// Services
import { deleteMethod, fetcher } from '@/services/fetcher';

// Types
import { Tech } from '@/interfaces/tech';

// Helpers
import { getImageUrl } from '@/utils/helpers';

export const TechTable = () => {
  const { data, isLoading, mutate } = useSWR(API_ROUTER.TECH_LIST, fetcher);

  if (isLoading) return <TechTableSkeleton />;

  const handleDelete = async (id: string) => {
    const newTechList = data.filter((item: Tech) => item.id !== id);
    try {
      await mutate(newTechList, false);
      await deleteMethod(API_ROUTER.TECH_DETAIL(id));

      // TODO: Implement toast
      alert('Deleted!');
    } catch {
      throw new Error('Something wrong when delete this tech');
    }
  };

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data.map(({ id, name, logo }: Tech) => (
          <tr key={id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <Image
                  alt={`${name} logo`}
                  src={getImageUrl(name, logo)}
                  className="rounded-full"
                  width={28}
                  height={28}
                />
                <p>{name}</p>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link
                  href={PAGE_ROUTES.TECH_DETAIL(id!)}
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
  );
};
