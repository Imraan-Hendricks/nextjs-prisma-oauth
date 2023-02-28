import { CameraIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, MouseEvent, useRef } from 'react';
import { clsx } from 'clsx';
import { Redirect } from '@/components/Redirect';
import { sessionAdapter } from '@/api/auth/session/session-adapter';
import { useQuery } from '@tanstack/react-query';

interface FormProps {
  handleFileOnChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  refreshFileOnClick: (e: MouseEvent<HTMLInputElement>) => void;
}

export function Form({ handleFileOnChange, refreshFileOnClick }: FormProps) {
  const labelRef = useRef<HTMLLabelElement | null>(null);

  const {
    data: session,
    isError,
    isLoading,
  } = useQuery(sessionAdapter.get.getOptions());

  if (isLoading) return null;
  if (isError) return <Redirect to='/500' />;

  return (
    <form className='group relative w-12 h-12 sm:w-48 sm:h-48 rounded-full bg-white overflow-hidden'>
      {session.user?.avatar && (
        <div className='absolute inset-0 h-full z-10'>
          <img src={session.user?.avatar.location} alt='avatar' />
        </div>
      )}
      <div className='absolute inset-0 z-20'>
        <label
          ref={labelRef}
          htmlFor='avatarUpload'
          className='block h-full group-hover:bg-black/40 cursor-pointer'
        />
        <input
          id='avatarUpload'
          className='hidden'
          type='file'
          onChange={handleFileOnChange}
          onClick={refreshFileOnClick}
        />
      </div>
      <div
        className='absolute left-0 right-0 top-2/4 -translate-y-2/4 z-30 cursor-pointer'
        onClick={() => labelRef.current?.click()}>
        <CameraIcon
          className={clsx(
            'w-8 h-8 mx-auto text-gray-300 group-hover:text-gray-100 group-hover:block ',
            session.user?.avatar && 'hidden'
          )}
        />
      </div>
    </form>
  );
}
