import { resolver } from '../../../../utils/validation';
import {
  signin,
  SigninData,
  SigninSchema,
} from '../../../../api/auth/signin/adapter';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSession } from '../../../../context/Session';

export function useSignup() {
  const { setSession, setStatus } = useSession();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SigninData>({
    resolver: resolver(SigninSchema),
  });

  const mutation = useMutation(signin, {
    onError: (error: any) => alert(error.message),
    onSuccess: async (user) => {
      setSession({ user });
      setStatus('authenticated');
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

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

  return { errors, fields, isLoading: mutation.isLoading, onSubmit };
}
