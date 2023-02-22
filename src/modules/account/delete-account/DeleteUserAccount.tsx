import { Dispatch, SetStateAction } from 'react';

interface DeleteUserAccountProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeleteUserAccount({ setIsOpen }: DeleteUserAccountProps) {
  return (
    <section className='px-5 py-12'>
      <div className='container mx-auto grid gap-8 animate-[fade-in_600ms_ease]'>
        <h1 className='text-h6'>Delete Account</h1>
        <hr />
        <p className='text-body1'>
          Are you sure you want to delete your account?{' '}
          <span
            className='text-blue-600 hover:text-blue-500 active:text-blue-700 cursor-pointer'
            onClick={() => setIsOpen(true)}>
            Yes, delete my account!
          </span>
        </p>
      </div>
    </section>
  );
}
