import { resolver } from '../../../../utils/validation';
import {
  signup,
  SignupData,
  SignupSchema,
} from '../../../../api/auth/signup/adapter';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSession } from '../../../../context/Session';

export function useSignup() {
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

  return { errors, fields, isLoading: mutation.isLoading, onSubmit };
}
