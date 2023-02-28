import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { userBySidAdapter } from '@/api/users/sid/sid-adapter';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export function useUpdateUserBySid() {
  const { updateSession } = useUpdateSession();
  const { handleSubmit } = useForm();

  const { isLoading, mutate } = useMutation(userBySidAdapter.put.mutate, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const onSubmit = handleSubmit((data) => mutate({ ...data, newUser: false }));

  return { isLoading, onSubmit };
}
