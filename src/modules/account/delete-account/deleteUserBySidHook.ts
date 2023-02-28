import { userBySidAdapter } from '@/api/users/sid/sid-adapter';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export function useDeleteUserBySid() {
  const { updateSession } = useUpdateSession();

  const { isLoading, mutate } = useMutation(userBySidAdapter.delete.mutate, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const deleteUser = () => mutate();

  return { deleteUser, isLoading };
}
