import { Metadata } from 'next';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { CreateUserForm } from '@/components/Forms/CreateUserForm';

// Constants
import { ROUTER } from '@/constants/route';

export const metadata: Metadata = {
  title: 'Create User'
};

const Page = async () => {
  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Users', href: ROUTER.USER },
          {
            label: 'Create User',
            href: ROUTER.USER_CREATE
          }
        ]}
      />
      <CreateUserForm />
    </main>
  );
};

export default Page;
