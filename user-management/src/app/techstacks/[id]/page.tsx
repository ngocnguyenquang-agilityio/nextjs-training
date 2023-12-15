import { Suspense } from 'react';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { EditTechForm } from '@/components/Forms/EditTechForm';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <main>
      <Breadcrumb
        breadcrumbs={[
          { label: 'Tech Stacks', href: '/techstacks' },
          { label: 'Tech Stack details', href: `/techstacks/${id}/edit` }
        ]}
      />
      <Suspense
        fallback={
          <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-64 w-64" />
          </div>
        }
      >
        <EditTechForm id={id} />
      </Suspense>
    </main>
  );
};

export default Page;
