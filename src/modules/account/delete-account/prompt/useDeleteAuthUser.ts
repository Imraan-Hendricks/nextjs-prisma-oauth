import { deleteAuthUser } from '../../../../api/auth/user/adapter';
import { useMutation } from 'react-query';
import { useSession } from '../../../../context/Session';

export function useDeleteAuthUser() {
  const { setSession, setStatus } = useSession();

  const mutation = useMutation(deleteAuthUser, {
    onError: (error: any) => alert(error.message),
    onSuccess: async () => {
      setSession({ user: undefined });
      setStatus('unauthenticated');
    },
  });

  const deleteUser = () => mutation.mutate();

  return { deleteUser, isLoading: mutation.isLoading };
}
