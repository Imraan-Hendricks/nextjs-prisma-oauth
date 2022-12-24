import { PropsWithChildren } from 'react';
import { Redirect } from '../../../components/Redirect';
import { useSession } from '../../../context/Session';

export function Access({ children }: PropsWithChildren<unknown>) {
  const { session, status } = useSession();

  if (status === 'authenticated' && session.user) {
    if (session.user.newUser) return <Redirect to='/auth/new-user' />;
  }

  return <>{children}</>;
}
