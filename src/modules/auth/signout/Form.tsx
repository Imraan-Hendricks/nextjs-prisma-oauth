import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/Button';
import { useSignout } from './useSignout';

export function Form() {
  const { isLoading, signoutUser, redirectBack } = useSignout();

  return (
    <section className='flex justify-center items-center min-h-full px-5 py-8'>
      <div className='grid gap-5 w-full lg:max-w-4xl 2xl:max-w-[92rem] mx-auto items-center animate-[fade-in_600ms_ease]'>
        <ArrowLeftOnRectangleIcon className='w-12 h-12 mx-auto text-blue-500' />
        <h1 className='text-h4 text-center text-gray-800'>Sign Out</h1>
        <p className='text-body1 text-center text-gray-500'>
          Oh no! You're leaving...
          <br /> Are you sure?
        </p>
        <div className='grid grid-cols-2 gap-2 w-max mx-auto'>
          <Button onClick={redirectBack}>Back</Button>
          <Button
            color='black'
            disabled={isLoading}
            loading={isLoading}
            variant='contained'
            onClick={signoutUser}>
            Sign Out
          </Button>
        </div>
      </div>
    </section>
  );
}
