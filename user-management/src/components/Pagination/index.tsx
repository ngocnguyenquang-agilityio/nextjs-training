'use client';

// Components
import { Button } from '../Button';

// Helpers
import { cls } from '@/utils/cls';

const handleChangePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
  // TODO: Handle change pagination
};

interface PaginationProps {
  totalPages: number;
  standingPage: null | string;
}

export const Pagination = ({ totalPages, standingPage }: PaginationProps) => {
  return (
    <nav className="pt-4 flex justify-end">
      <ul data-testid="pagination" className="inline-flex -space-x-px text-md gap-4">
        {Array.apply(0, new Array(totalPages)).map((_, idx) => {
          const currentPage = idx + 1;
          const isActivePage = currentPage.toString() === standingPage;

          return (
            <li key={idx}>
              <Button
                variant="secondary"
                value={currentPage.toString()}
                onClick={handleChangePagination}
                className={cls(`bg-transparent border ${isActivePage && 'bg-blue-600 text-white'}`)}
              >
                {currentPage.toString()}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
