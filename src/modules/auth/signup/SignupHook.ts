import { SignupAdapter, signupAdapter } from '@/api/auth/signup/signup-adapter';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export function useSignup() {
  const { updateSession } = useUpdateSession();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupAdapter['post']['body']>({
    resolver: signupAdapter.post.useResolver(),
  });

  const { isLoading, mutate } = useMutation(signupAdapter.post.mutate, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const onSubmit = handleSubmit((data) => mutate(data));

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

  return { errors, fields, isLoading, onSubmit };
}
