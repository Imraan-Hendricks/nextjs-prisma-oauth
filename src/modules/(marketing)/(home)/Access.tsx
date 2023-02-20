import { PropsWithChildren } from 'react';
import { Redirect } from '../../../components/Redirect';
import { sessionQueryOptions } from '../../../api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';

export function Access({ children }: PropsWithChildren<unknown>) {
  const { data: session, isError, isSuccess } = useQuery(sessionQueryOptions);

  if (isError) return <Redirect to='/500' />;

  if (isSuccess && session.user && session.user.newUser) {
    return <Redirect to='/auth/new-user' />;
  }

  return <>{children}</>;
}
