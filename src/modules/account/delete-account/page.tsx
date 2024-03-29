import AccountLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Loading } from '@/components/Loading';
import { DeleteUserAccount } from './DeleteUserAccount';
import { Prompt } from './Prompt';
import { Redirect } from '@/components/Redirect';
import { sessionAdapter } from '@/api/auth/session/session-adapter';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function DeleteAccount() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: session,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(sessionAdapter.get.getOptions());

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
      <DeleteUserAccount setIsOpen={setIsOpen} />
      {isOpen && (
        <div className='fixed inset-0 h-screen w-full px-5 bg-black/70 flex justify-center items-center'>
          <Prompt setIsOpen={setIsOpen} />
        </div>
      )}
    </AccountLayout>
  );
}
