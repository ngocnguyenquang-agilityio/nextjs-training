import { Button } from '../Button';

const UserTableRowSkeleton = () => {
  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100" />
          <div className="h-6 w-24 rounded bg-gray-100" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-32 rounded bg-gray-100" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 rounded bg-gray-100" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-16 rounded bg-gray-100" />
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100" />
          <div className="h-[38px] w-[38px] rounded bg-gray-100" />
        </div>
      </td>
    </tr>
  );
};

export const UserTableSkeleton = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
        </tr>
      </thead>
      <tbody>
        <UserTableRowSkeleton />
        <UserTableRowSkeleton />
        <UserTableRowSkeleton />
        <UserTableRowSkeleton />
        <UserTableRowSkeleton />
      </tbody>
    </table>
  );
};

const TechTableRowSkeleton = () => {
  return (
    <tr className="odd:bg-white even:bg-gray-50">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
};

export const TechTableSkeleton = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
          <th scope="col" className="px-6 py-3">
            <div className="h-6 w-32 rounded bg-gray-200" />
          </th>
        </tr>
      </thead>
      <tbody>
        <TechTableRowSkeleton />
        <TechTableRowSkeleton />
        <TechTableRowSkeleton />
        <TechTableRowSkeleton />
        <TechTableRowSkeleton />
      </tbody>
    </table>
  );
};

export const PaginationSkeleton = () => {
  return (
    <nav className="pt-4 flex justify-end">
      <ul className="inline-flex -space-x-px text-md gap-4">
        <div className="p-5 rounded-md bg-gray-200" />
        <div className="p-5 rounded-md bg-gray-200" />
        <div className="p-5 rounded-md bg-gray-200" />
        <div className="p-5 rounded-md bg-gray-200" />
      </ul>
    </nav>
  );
};
