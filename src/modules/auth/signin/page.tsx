import { CustomHead } from '@/components/CustomHead';
import { Form } from './Form';
import { Loading } from '@/components/Loading';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(sessionQueryOptions);

  if (isLoading) return <Loading />;

  if (isError) return <Redirect to='/500' />;

  if (isSuccess && session.user) {
    if (session.user.newUser) {
      return <Redirect to='/auth/new-user' />;
    }
    return <Redirect to='/account/profile' />;
  }

  return (
    <main>
      <CustomHead title='Sign In' />
      <Form />
    </main>
  );
}
