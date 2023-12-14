import { Metadata } from 'next';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { CreateUserForm } from '@/components/Forms/CreateUserForm';

// Constants
import { PAGE_ROUTES } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Create User'
};

const CreateUserPage = async () => {
  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Users', href: PAGE_ROUTES.USER_LIST },
          {
            label: 'Create User',
            href: PAGE_ROUTES.USER_CREATE
          }
        ]}
      />
      <CreateUserForm />
    </main>
  );
};

export default CreateUserPage;
