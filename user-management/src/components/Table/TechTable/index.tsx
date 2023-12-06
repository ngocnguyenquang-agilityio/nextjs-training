'use client';

import { SyntheticEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Button } from '@/components/Button';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const mockTechStacks = [
  {
    name: 'TypeScript',
    logo: 'https://symbols.getvecta.com/stencil_25/87_typescript.cb2d7326fa.svg',
    id: '4'
  },
  {
    name: 'React',
    logo: 'https://symbols.getvecta.com/stencil_25/72_react.76a8d36b4b.svg',
    id: '5'
  },
  {
    name: 'NextJS',
    logo: 'https://static-00.iconduck.com/assets.00/next-js-icon-2048x2048-5dqjgeku.png',
    id: '6'
  }
];

export const TechTable = () => {
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
        {mockTechStacks.map(({ id, name, logo }) => (
          <tr key={id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <Image alt={`${name} logo`} src={logo} className="rounded-full" width={28} height={28} />
                <p>{name}</p>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-3">
                <Link
                  href={`/edit-tech/${id}`}
                  className="group rounded-md border p-2 hover:bg-blue-400"
                  data-testid={`edit-${id}`}
                >
                  <PencilIcon className="w-5 group-hover:text-white" />
                </Link>
                <Button
                  size="sm"
                  className="group bg-transparent rounded-md border hover:bg-red-400"
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
