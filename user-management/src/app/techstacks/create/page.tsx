import { Metadata } from 'next';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { CreateTechForm } from '@/components/Forms/CreateTechForm';

// Constants
import { PAGE_ROUTES } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Create Tech'
};

const CreateTechPage = async () => {
  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Users', href: PAGE_ROUTES.TECH_LIST },
          {
            label: 'Create User',
            href: PAGE_ROUTES.TECH_CREATE
          }
        ]}
      />
      <CreateTechForm />
    </main>
  );
};

export default CreateTechPage;
