import { Metadata } from 'next';

// Components
import { Breadcrumb } from '@/components/Breadcrumb';
import { HomeContent } from '@/components/HomeContent';

// Constants
import { PAGE_ROUTES } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Home'
};

const Home = () => {
  return (
    <main>
      <Breadcrumb breadcrumbs={[{ label: 'Home', href: PAGE_ROUTES.HOME }]} />
      <HomeContent />
    </main>
  );
};

export default Home;
