import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { Button } from '../../../../components/Button';
import { useSignout } from './useSignout';

export function Form() {
  const { signoutUser, redirectBack } = useSignout();
  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='bg-white w-full px-5 py-24 2xl:py-32'>
        <div className='grid gap-5 lg:max-w-4xl 2xl:max-w-[92rem] mx-auto items-center'>
          <ArrowLeftOnRectangleIcon className='w-12 h-12 mx-auto text-blue-500' />
          <h1 className='text-h4 text-center text-gray-800'>Signout Page</h1>
          <p className='text-body1 text-center text-gray-500'>
            Oh no! You're leaving...
            <br /> Are you sure?
          </p>
          <div className='grid grid-cols-2 gap-2 w-max mx-auto'>
            <Button onClick={redirectBack}>Back</Button>
            <Button variant='outlined' onClick={signoutUser}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
