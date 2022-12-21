import { signout } from '../../api/signout/adapter';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from '../../session/Context';

export function useSignout() {
  const { back } = useRouter();
  const { setSession, setStatus } = useSession();

  const mutation = useMutation(signout, {
    onError: (error: any) => alert(error.message),
    onSuccess: async () => {
      setSession({ user: undefined });
      setStatus('unauthenticated');
    },
  });

  const signoutUser = () => mutation.mutate();
  const redirectBack = () => back();

  return { signoutUser, redirectBack };
}
