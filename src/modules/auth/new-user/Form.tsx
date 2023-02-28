import { Button } from '@/components/Button';
import { Redirect } from '@/components/Redirect';
import { sessionAdapter } from '@/api/auth/session/session-adapter';
import { useUpdateUserBySid } from './useUpdateUserBySid';
import { useQuery } from '@tanstack/react-query';

export function Form() {
  const { isLoading, onSubmit } = useUpdateUserBySid();

  const {
    data: session,
    isError,
    isLoading: sessionIsLoading,
  } = useQuery(sessionAdapter.get.getOptions());

  if (sessionIsLoading) return null;
  if (isError) return <Redirect to='/500' />;

  return (
    <section className='flex justify-center items-center min-h-full px-5 sm:px-16 md:px-24 lg:px-48 py-8'>
      <div className='grid gap-4 w-full max-w-4xl mx-auto items-center animate-[fade-in_600ms_ease]'>
        <h1 className='text-h4 text-center md:text-start'>
          Welcome{' '}
          <span className='text-blue-500'>{session.user?.username}</span>
        </h1>
        <hr />
        <p className='text-body1 text-gray-500 text-center md:text-start'>
          This page is only shown to new users and is used to collect or display
          additional information after the user has signed up.
        </p>
        <form onSubmit={onSubmit}>
          <Button
            disabled={isLoading}
            loading={isLoading}
            className='mx-auto md:mx-0'>
            Continue
          </Button>
        </form>
      </div>
    </section>
  );
}
