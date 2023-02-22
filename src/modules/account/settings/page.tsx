import AccountLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
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

  if (isSuccess) {
    if (!session.user) return <Redirect to='/auth/signin' replace />;
    if (session.user.newUser) {
      return <Redirect to='/auth/new-user' replace />;
    }
  }

  return (
    <AccountLayout>
      <CustomHead title='Settings' />
      <section>Settings</section>
    </AccountLayout>
  );
}
