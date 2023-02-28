import { signoutAdapter } from '@/api/auth/signout/signout-adapter';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export function useSignout() {
  const { updateSession } = useUpdateSession();

  const { isLoading, mutate } = useMutation(signoutAdapter.delete.mutate, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const signoutUser = () => mutate();

  return { isLoading, signoutUser };
}
