import Link from 'next/link';
import { Button } from '@/components/Button';
import { Divider } from '@/components/Divider';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import { TextField } from '@/components/TextField';
import { useSignup } from './useSignin';

export function Form() {
  const { fields, isLoading, onSubmit } = useSignup();

  return (
    <section className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='bg-white w-full px-5 py-24 2xl:py-32'>
        <div className='grid gap-4 max-w-md mx-auto items-center'>
          <div className='grid gap-4 h-max'>
            <LockClosedIcon className='w-12 h-12 mx-auto text-blue-500' />
            <h1 className='text-h4 text-center'>Sign In</h1>
            <hr className='w-32 border-2 border-blue-600 rounded mx-auto' />
            <p className='text-caption text-gray-500 text-center'>
              Don't have an account.{' '}
              <Link
                href='/auth/signup'
                className='text-blue-600 hover:text-blue-500 cursor-pointer'>
                Sign up here
              </Link>
            </p>
          </div>
          <form onSubmit={onSubmit} className='grid gap-8 w-full'>
            {fields.map((props) => (
              <TextField key={props.name} {...props} />
            ))}
            <Button disabled={isLoading} loading={isLoading}>
              Sign In
            </Button>
          </form>
          <Divider className='my-4'>Or continue with</Divider>
          <div className='grid gap-8'>
            {[
              {
                icon: faFacebook,
                text: 'Sign In With Facebook',
                href: '/api/auth/oauth/facebook',
              },
              {
                icon: faGoogle,
                text: 'Sign In With Google',
                href: '/api/auth/oauth/facebook',
              },
            ].map(({ icon, text, href }) => (
              <Link key={text} href={href}>
                <Button variant='outlined' className='w-full'>
                  <FontAwesomeIcon
                    className='mr-4 w-7 h-7 text-blue-500 group-hover:text-blue-600'
                    icon={icon}
                  />
                  {text}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
