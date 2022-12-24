import { Loading } from '../../../components/Loading';
import { PropsWithChildren } from 'react';
import { Redirect } from '../../../components/Redirect';
import { useSession } from '../../../context/Session';

export function Access({ children }: PropsWithChildren<unknown>) {
  const { status } = useSession();

  if (status === 'loading') return <Loading />;
  if (status === 'unauthenticated') return <Redirect to='/' />;

  return <>{children}</>;
}
