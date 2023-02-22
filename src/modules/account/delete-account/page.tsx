import AccountLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Loading } from '@/components/Loading';
import { Main } from './Main';
import { Prompt } from './Prompt';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(sessionQueryOptions);

  if (isLoading) return <Loading />;

  if (isError) return <Redirect to='/500' />;

  if (isSuccess) {
    if (!session.user) return <Redirect to='/' replace />;
    if (session.user.newUser) {
      return <Redirect to='/auth/new-user' replace />;
    }
  }

  return (
    <AccountLayout>
      <CustomHead title='Delete Account' />
      <Main setIsOpen={setIsOpen} />
      {isOpen && (
        <div className='fixed inset-0 h-screen w-full px-5 bg-black/70 flex justify-center items-center'>
          <Prompt setIsOpen={setIsOpen} />
        </div>
      )}
    </AccountLayout>
  );
}
