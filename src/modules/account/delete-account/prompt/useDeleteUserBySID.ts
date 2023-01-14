import { deleteUserBySID } from '../../../../api/users/sid/adapter';
import { useMutation } from 'react-query';
import { useSession } from '../../../../context/Session';

export function useDeleteUserBySID() {
  const { setSession, setStatus } = useSession();

  const mutation = useMutation(deleteUserBySID, {
    onError: (error: any) => alert(error.message),
    onSuccess: async () => {
      setSession({ user: undefined });
      setStatus('unauthenticated');
    },
  });

  const deleteUser = () => mutation.mutate();

  return { deleteUser, isLoading: mutation.isLoading };
}
