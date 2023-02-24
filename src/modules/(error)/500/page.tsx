import ErrorLayout from '../layout';
import { Button } from '@/components/Button';
import { CustomHead } from '@/components/CustomHead';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export default function Custom500() {
  const { back, push } = useRouter();
  return (
    <ErrorLayout>
      <CustomHead title='500' />
      <section className='flex justify-center items-center min-h-full px-5 py-8'>
        <div className='w-full animate-[fade-in_600ms_ease]'>
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
            <div className='grid grid-cols-2 gap-2'>
              <Button onClick={() => back()}>Back</Button>
              <Button onClick={() => push('/')} color='black'>
                Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </ErrorLayout>
  );
}
