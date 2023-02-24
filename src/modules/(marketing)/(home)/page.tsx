import MarketingLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Hero } from './Hero';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/session-adapter';
import { useNavbar } from '@/modules/common/NavbarContext';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  useNavbar('/');

  const { data: session, isError, isSuccess } = useQuery(sessionQueryOptions);

  if (isError) return <Redirect to='/500' />;
  if (isSuccess && session.user && session.user.newUser)
    return <Redirect to='/auth/new-user' replace />;

  return (
    <MarketingLayout>
      <CustomHead title='Home' />
      <Hero />
    </MarketingLayout>
  );
}
