import Link from 'next/link';
import { Button } from '../../../components/Button';
import { ChangeEvent, useState } from 'react';
import { Checkbox } from '../../../components/Checkbox';
import { resolver } from '../../../utils/validation-utils';
import { signup, SignupData, SignupSchema } from './api/adapter';
import { TextField } from '../../../components/TextField';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSession } from '../session/Context';

export function Form() {
  const { setSession, setStatus } = useSession();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupData>({
    resolver: resolver(SignupSchema),
  });

  const mutation = useMutation(signup, {
    onError: (error: any) => alert(error.message),
    onSuccess: async (user) => {
      setSession({ user });
      setStatus('authenticated');
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  const fields = [
    {
      helperText: errors.username?.message,
      id: 'username',
      isError: !!errors.username?.message,
      label: 'Username',
      placeholder: 'Enter username',
      required: true,
      ...register('username'),
    },
    {
      helperText: errors.email?.message,
      id: 'email',
      isError: !!errors.email?.message,
      label: 'Email',
      placeholder: 'Enter email',
      required: true,
      ...register('email'),
    },
    {
      helperText: errors.firstName?.message,
      id: 'firstName',
      isError: !!errors.firstName?.message,
      label: 'First name',
      placeholder: 'Enter first name',
      required: true,
      ...register('firstName'),
    },
    {
      helperText: errors.lastName?.message,
      id: 'lastName',
      isError: !!errors.lastName?.message,
      label: 'Last name',
      placeholder: 'Enter last name',
      required: true,
      ...register('lastName'),
    },
    {
      helperText: errors.contactNumber?.message,
      id: 'contactNumber',
      isError: !!errors.contactNumber?.message,
      label: 'Contact number',
      placeholder: 'Enter contact number',
      ...register('contactNumber'),
    },
    {
      helperText: errors.password?.message,
      id: 'password',
      isError: !!errors.password?.message,
      label: 'Password',
      placeholder: 'Enter password',
      required: true,
      type: 'password',
      ...register('password'),
    },
  ] as const;

  const [disabled, setDisabled] = useState(true);
  const handleCheckboxOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) return setDisabled(false);
    setDisabled(true);
  };

  return (
    <div className='flex justify-center items-center lg:h-screen bg-gray-50'>
      <div className='bg-white w-full px-5 py-8 lg:py-24 2xl:py-32'>
        <div className='grid 2xl:grid-cols-2 gap-y-4 lg:max-w-4xl 2xl:max-w-[92rem] mx-auto items-center'>
          <div className='grid gap-4 h-max'>
            <h1 className='text-h4'>Sign Up</h1>
            <hr className='w-32 border-2 border-blue-600 rounded' />
            <p className='text-caption text-gray-500'>
              Already have an account.{' '}
              <Link
                href='/auth/signin'
                className='text-blue-600 hover:text-blue-500 cursor-pointer'>
                Sign in Here
              </Link>
            </p>
            <p className='text-body1 text-gray-600 2xl:max-w-xl'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              laoreet mauris sagittis interdum. Morbi mi lectus, dapibus.
            </p>
          </div>
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
              disabled={disabled || mutation.isLoading}
              loading={mutation.isLoading}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
