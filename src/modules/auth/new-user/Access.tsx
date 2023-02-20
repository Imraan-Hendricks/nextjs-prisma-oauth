import { Loading } from '../../../components/Loading';
import { PropsWithChildren } from 'react';
import { Redirect } from '../../../components/Redirect';
import { sessionQueryOptions } from '../../../api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';

export function Access({ children }: PropsWithChildren<unknown>) {
  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(sessionQueryOptions);

  if (isLoading) return <Loading />;

  if (isError) return <Redirect to='/500' />;

  if (isSuccess) {
    if (!session.user) return <Redirect to='/auth/signin' />;
    if (!session.user.newUser) {
      return <Redirect to='/account/profile' />;
    }
  }

  return <>{children}</>;
}
