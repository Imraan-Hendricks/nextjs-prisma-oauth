import AuthLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Form } from './Form';
import { Loading } from '@/components/Loading';
import { Redirect } from '@/components/Redirect';
import { sessionAdapter } from '@/api/auth/session/session-adapter';
import { useQuery } from '@tanstack/react-query';

export default function Signin() {
  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(sessionAdapter.get.getOptions());

  if (isLoading) return <Loading />;

  if (isError) return <Redirect to='/500' />;

  if (isSuccess && session.user) {
    if (session.user.newUser) {
      return <Redirect to='/auth/new-user' replace />;
    }
    return <Redirect to='/account/profile' replace />;
  }

  return (
    <AuthLayout>
      <CustomHead title='Sign In' />
      <Form />
    </AuthLayout>
  );
}
