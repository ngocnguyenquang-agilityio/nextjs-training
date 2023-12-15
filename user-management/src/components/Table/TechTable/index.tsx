'use client';

import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { SyntheticEvent } from 'react';

// Components
import { Button } from '@/components/Button';
import { TechTableSkeleton } from '@/components/Skeleton';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Constants
import { API_ROUTER, PAGE_ROUTES } from '@/constants/routes';

// Services
import { fetcher } from '@/services/fetcher';

// Types
import { Tech } from '@/interfaces/tech';

export const TechTable = () => {
  const { data, isLoading } = useSWR(API_ROUTER.TECH_LIST, fetcher);

  const getDefaultLogo = (name: string) => {
    return `https://ui-avatars.com/api/?name=${name}&rounded=true&background=random&size=28`;
  };

  if (isLoading) return <TechTableSkeleton />;

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    //TODO: Handle delete item

    alert('Delete button clicked!'); //Remove later
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
                  src={logo ? logo : getDefaultLogo(name)}
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
  );
};
