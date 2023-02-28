import AccountLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Loading } from '@/components/Loading';
import { Options } from './Options';
import { Redirect } from '@/components/Redirect';
import { sessionAdapter } from '@/api/auth/session/session-adapter';
import { useQuery } from '@tanstack/react-query';

export default function Settings() {
  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(sessionAdapter.get.getOptions());

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
      <Options />
    </AccountLayout>
  );
}
