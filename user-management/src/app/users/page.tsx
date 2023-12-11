import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { UserTableSkeleton } from '@/components/Skeleton';
import { UserTable } from '@/components/Table/UserTable';

// Icons
import { PlusIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Users'
};

const Page = () => {
  return (
    <div className="w-full">
      <Breadcrumb
        breadcrumbs={[
          {
            label: 'Users',
            href: '/users'
          }
        ]}
      />
      <div className="mb-4 flex md:mt-8">
        <Link
          href="/users/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="hidden md:block">Create User</span>
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable />
      </Suspense>
    </div>
  );
};

export default Page;
