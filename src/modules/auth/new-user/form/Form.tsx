import { Button } from '../../../../components/Button';
import { useSession } from '../../../../context/Session';
import { useUpdateAuthUser } from './useUpdateAuthUser';

export function Form() {
  const { session } = useSession();
  const { isLoading, onSubmit } = useUpdateAuthUser();

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='bg-white w-full px-5 py-24 2xl:py-32'>
        <div className='grid gap-4 max-w-7xl mx-auto items-center'>
          <h1 className='text-h4'>
            Welcome{' '}
            <span className='text-blue-500'>{session.user?.username}</span>
          </h1>
          <hr />
          <p className='text-body1 text-gray-500'>
            This page is only shown to new users and is used to collect or
            display additional information after the user has signed up.
          </p>
          <form onSubmit={onSubmit}>
            <Button disabled={isLoading} loading={isLoading}>
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
