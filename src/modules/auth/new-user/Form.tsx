import { Button } from '@/components/Button';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { useUpdateUserBySID } from './useUpdateUserBySID';
import { useQuery } from '@tanstack/react-query';

export function Form() {
  const { isLoading, onSubmit } = useUpdateUserBySID();

  const {
    data: session,
    isError,
    isLoading: sessionIsLoading,
  } = useQuery(sessionQueryOptions);

  if (sessionIsLoading) return null;
  if (isError) return <Redirect to='/500' />;

  return (
    <section className='flex justify-center items-center min-h-full px-5 py-8'>
      <div className='grid gap-4 w-full max-w-7xl mx-auto items-center animate-[fade-in_600ms_ease]'>
        <h1 className='text-h4'>
          Welcome{' '}
          <span className='text-blue-500'>{session.user?.username}</span>
        </h1>
        <hr />
        <p className='text-body1 text-gray-500'>
          This page is only shown to new users and is used to collect or display
          additional information after the user has signed up.
        </p>
        <form onSubmit={onSubmit}>
          <Button disabled={isLoading} loading={isLoading}>
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
}
