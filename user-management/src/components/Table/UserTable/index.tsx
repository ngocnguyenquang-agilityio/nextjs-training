'use client';

import { SyntheticEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { Button } from '@/components/Button';

// Icons
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const mockUsers = [
  {
    firstName: 'Tracy',
    lastName: 'Windler',
    dob: '1974-08-01T09:03:58.059Z',
    phone: '702-259-4678',
    entryDate: '2023-12-05T01:43:29.662Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/637.jpg',
    id: '1'
  },
  {
    firstName: 'Donny',
    lastName: 'Rosenbaum',
    dob: '2004-10-17T05:20:13.923Z',
    phone: '592-406-8192',
    entryDate: '2023-12-04T20:04:41.338Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1244.jpg',
    id: '2'
  },
  {
    firstName: 'Mauricio',
    lastName: 'Prosacco',
    dob: '1986-06-08T15:42:22.143Z',
    phone: '245-329-6808',
    entryDate: '2023-12-04T11:04:56.722Z',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/806.jpg',
    id: '3'
  }
];

export const UserTable = () => {
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
        {mockUsers.map(({ id, firstName, lastName, dob, phone, entryDate, avatar }) => (
          <tr key={id} className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 focus:bg-gray-300">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <Image alt={`${lastName} avatar`} src={avatar} className="rounded-full" width={28} height={28} />
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
                  href={`/edit-user/${id}`}
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
