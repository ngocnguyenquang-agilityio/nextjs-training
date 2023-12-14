import { Suspense } from 'react';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { EditUserForm } from '@/components/Forms/EditUserForm';

// Constants
import { PAGE_ROUTES } from '@/constants/routes';

const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Users', href: PAGE_ROUTES.USER_LIST },
          { label: 'User details', href: PAGE_ROUTES.USER_DETAIL(id) }
        ]}
      />

      {/* TODO: Implement UserForm skeleton */}
      <Suspense
        fallback={
          <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64" />
          </div>
        }
      >
        <EditUserForm id={id} />
      </Suspense>
    </main>
  );
};

export default UserDetailPage;