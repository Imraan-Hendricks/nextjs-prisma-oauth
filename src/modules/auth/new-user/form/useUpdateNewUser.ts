import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { updateNewUser } from '../../../../api/auth/new-user/adapter';
import { useSession } from '../../../../context/Session';

export function useUpdateNewUser() {
  const { setSession, setStatus } = useSession();

  const { handleSubmit } = useForm();

  const mutation = useMutation(updateNewUser, {
    onError: (error: any) => alert(error.message),
    onSuccess: async (user) => {
      setSession({ user });
      setStatus('authenticated');
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return { isLoading: mutation.isLoading, onSubmit };
}
