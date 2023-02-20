import { Button } from '../../../components/Button';
import { CustomHead } from '@/components/CustomHead';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export default function Page() {
  const { back, push } = useRouter();
  return (
    <>
      <CustomHead title='500' />
      <div className='flex justify-center items-center min-h-screen bg-gray-50'>
        <div className='bg-white w-full py-20 px-5'>
          <div className='grid gap-8 justify-items-center'>
            <ExclamationTriangleIcon className='w-32 h-32 text-blue-500' />
            <h1 className='text-h4'>
              <span className='text-blue-500'>500</span> - Internal Server Error
            </h1>
            <p className='text-subtitle1 max-w-xl text-center text-gray-500'>
              We encountered an error and cannot fulfill your request. Our tech
              team has been informed about this and will try to resolve this
              problem as soon as possible.
            </p>
            <div className='grid grid-cols-2 gap-4'>
              <Button onClick={() => back()}>Back</Button>
              <Button onClick={() => push('/')}>Home</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
