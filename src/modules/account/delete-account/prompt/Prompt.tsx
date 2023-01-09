import { Button } from '../../../../components/Button';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useClickAwayListener } from '../../../../hooks/useClickAwayListener';
import { useDeleteAuthUser } from './useDeleteAuthUser';

interface PromptProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Prompt({ setIsOpen }: PromptProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickAwayListener(ref, () => setIsOpen(false));

  const { deleteUser, isLoading } = useDeleteAuthUser();

  return (
    <div ref={ref} className='bg-white p-8 grid gap-6 max-w-xl rounded-md'>
      <h2 className='text-h6'>Delete account</h2>
      <hr />
      <p className='text-body2 text-gray-700'>
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <Button
        className='w-max'
        onClick={deleteUser}
        disabled={isLoading}
        loading={isLoading}>
        Delete your account
      </Button>
    </div>
  );
}
