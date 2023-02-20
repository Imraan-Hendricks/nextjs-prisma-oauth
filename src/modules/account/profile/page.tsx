import AccountLayout from '../layout';
import { CustomHead } from '@/components/CustomHead';
import { Form } from './Form';
import { Info } from './Info';
import { Loading } from '@/components/Loading';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { UpdateForm } from './useUpdateUserBySID';
import { useClickAwayListener } from '../../../hooks/useClickAwayListener';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
  const [updateForm, setUpdateForm] = useState<UpdateForm>();

  const ref = useRef<HTMLDivElement | null>(null);
  useClickAwayListener(ref, () => setUpdateForm(undefined));

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
    if (session.user.newUser) {
      return <Redirect to='/auth/new-user' />;
    }
  }

  return (
    <AccountLayout>
      <CustomHead title='Profile' />
      <Info setUpdateForm={setUpdateForm} />
      {updateForm && (
        <div ref={ref} className='fixed left-0 bottom-0 w-full bg-gray-50'>
          <Form updateForm={updateForm} setUpdateForm={setUpdateForm} />
        </div>
      )}
    </AccountLayout>
  );
}
