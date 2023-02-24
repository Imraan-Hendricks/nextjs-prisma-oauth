import Link from 'next/link';
import { Button } from '@/components/Button';
import { ChangeEvent, useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@/components/TextField';
import { useSignup } from './SignupHook';

export function Form() {
  const { fields, isLoading, onSubmit } = useSignup();

  const [disabled, setDisabled] = useState(true);
  const handleCheckboxOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) return setDisabled(false);
    setDisabled(true);
  };

  return (
    <section className='flex justify-center items-center min-h-full px-5 py-8'>
      <div className='grid 2xl:grid-cols-2 gap-y-4 w-full lg:max-w-4xl 2xl:max-w-[92rem] mx-auto items-center animate-[fade-in_600ms_ease]'>
        <div className='grid gap-4 h-max'>
          <h1 className='text-h4'>Sign Up</h1>
          <hr className='w-32 border-2 border-blue-600 rounded' />
          <p className='text-caption text-gray-500'>
            Already have an account.{' '}
            <Link
              href='/auth/signin'
              className='text-blue-600 hover:text-blue-500 cursor-pointer'>
              Sign in here
            </Link>
          </p>
          <p className='text-body1 text-gray-600 2xl:max-w-xl'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam laoreet
            mauris sagittis interdum. Morbi mi lectus, dapibus.
          </p>
        </div>
        <div className='grid gap-8'>
          <form
            onSubmit={onSubmit}
            className='grid lg:grid-cols-2 gap-8 w-full'>
            {fields.map((props) => (
              <TextField key={props.name} {...props} />
            ))}
            <Checkbox
              className='lg:col-span-2'
              id='tos'
              name='tos'
              onChange={handleCheckboxOnChange}>
              <label className='ml-2 text-caption'>
                I've read and agree with the{' '}
                <Link
                  href={'/terms-of-service'}
                  className='text-blue-600 hover:text-blue-500'>
                  Terms of Services
                </Link>
                , and our{' '}
                <Link
                  href={'/privacy-policy'}
                  className='text-blue-600 hover:text-blue-500'>
                  Privacy Policy
                </Link>
              </label>
            </Checkbox>
            <Button
              className='lg:col-span-2'
              disabled={disabled || isLoading}
              loading={isLoading}>
              Subscribe
            </Button>
          </form>
          <div className='grid lg:grid-cols-2 gap-8'>
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
