import Layout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Hero } from './Hero';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const { data: session, isError, isSuccess } = useQuery(sessionQueryOptions);

  if (isError) return <Redirect to='/500' />;
  if (isSuccess && session.user && session.user.newUser)
    return <Redirect to='/auth/new-user' replace />;

  return (
    <Layout>
      <CustomHead title='Home' />
      <Hero />
    </Layout>
  );
}
