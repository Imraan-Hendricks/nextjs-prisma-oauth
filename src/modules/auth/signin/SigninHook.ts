import { SigninAdapter, signinAdapter } from '@/api/auth/signin/signin-adapter';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export function useSignup() {
  const { updateSession } = useUpdateSession();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SigninAdapter['post']['body']>({
    resolver: signinAdapter.post.useResolver(),
  });

  const { isLoading, mutate } = useMutation(signinAdapter.post.mutate, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  const fields = [
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
