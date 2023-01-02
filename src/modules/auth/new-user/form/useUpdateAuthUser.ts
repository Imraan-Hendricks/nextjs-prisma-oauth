import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { updateAuthUser } from '../../../../api/auth/user/adapter';
import { useSession } from '../../../../context/Session';

export function useUpdateAuthUser() {
  const { setSession, setStatus } = useSession();

  const { handleSubmit } = useForm();

  const mutation = useMutation(updateAuthUser, {
    onError: (error: any) => alert(error.message),
    onSuccess: async (user) => {
      setSession({ user });
      setStatus('authenticated');
    },
  });

  const onSubmit = handleSubmit((data) =>
    mutation.mutate({ ...data, newUser: false })
  );

  return { isLoading: mutation.isLoading, onSubmit };
}
