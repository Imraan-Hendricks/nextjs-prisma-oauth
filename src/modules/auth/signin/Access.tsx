import { sessionQueryOptions } from '../../../api/auth/session/adapter';
import { Loading } from '../../../components/Loading';
import { PropsWithChildren } from 'react';
import { Redirect } from '../../../components/Redirect';
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

  if (isSuccess && session.user) {
    if (session.user.newUser) {
      return <Redirect to='/auth/new-user' />;
    }
    return <Redirect to='/account/profile' />;
  }

  return <>{children}</>;
}
