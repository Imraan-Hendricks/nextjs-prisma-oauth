import { deleteUserBySID } from '../../../../api/users/sid/adapter';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '../../../../hooks/useUpdateSession';

export function useDeleteUserBySID() {
  const { updateSession } = useUpdateSession();

  const { isLoading, mutate } = useMutation(deleteUserBySID, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const deleteUser = () => mutate();

  return { deleteUser, isLoading };
}
