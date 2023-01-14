import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { updateUserBySID } from '../../../../api/users/sid/adapter';
import { useSession } from '../../../../context/Session';

export function useUpdateUserBySID() {
  const { setSession, setStatus } = useSession();

  const { handleSubmit } = useForm();

  const mutation = useMutation(updateUserBySID, {
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
