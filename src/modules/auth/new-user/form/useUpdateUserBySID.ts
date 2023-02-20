import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { updateUserBySID } from '../../../../api/users/sid/adapter';
import { useUpdateSession } from '../../../../hooks/useUpdateSession';

export function useUpdateUserBySID() {
  const { updateSession } = useUpdateSession();
  const { handleSubmit } = useForm();

  const { isLoading, mutate } = useMutation(updateUserBySID, {
    onError: (error: any) => alert(error.message),
    onSuccess: updateSession,
  });

  const onSubmit = handleSubmit((data) => mutate({ ...data, newUser: false }));

  return { isLoading, onSubmit };
}
