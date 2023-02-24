import { signout } from '@/api/auth/signout/signout-adapter';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';
import { useRouter } from 'next/router';

export function useSignout() {
  const { back } = useRouter();
  const { updateSession } = useUpdateSession();

  const { isLoading, mutate } = useMutation(signout, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const signoutUser = () => mutate();
  const redirectBack = () => back();

  return { isLoading, signoutUser, redirectBack };
}
