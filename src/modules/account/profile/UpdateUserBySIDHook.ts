import { Dispatch, SetStateAction } from 'react';
import { resolver } from '@/utils/validation-utils';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UpdateableUserData } from '@/services/user-service';
import {
  UpdateableUserDataSchema,
  updateUserBySID,
} from '@/api/users/sid/sid-adapter';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export type UpdateForm =
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'contactNumber'
  | undefined;

interface UseUpdateUserBySIDProps {
  updateForm: UpdateForm;
  setUpdateForm: Dispatch<SetStateAction<UpdateForm | undefined>>;
}

export function useUpdateUserBySID({
  updateForm,
  setUpdateForm,
}: UseUpdateUserBySIDProps) {
  const { updateSession } = useUpdateSession();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateableUserData>({
    resolver: resolver(UpdateableUserDataSchema),
  });

  const { isLoading, mutate } = useMutation(updateUserBySID, {
    onError: (error: any) => alert(error.message),
    onSuccess: async () => {
      setUpdateForm(undefined);
      await updateSession();
    },
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  const fields = [
    {
      helperText: errors.username?.message,
      hidden: updateForm !== 'username',
      id: 'username',
      isError: !!errors.username?.message,
      placeholder: 'Enter username',
      required: true,
      ...register('username'),
    },
    {
      helperText: errors.firstName?.message,
      hidden: updateForm !== 'firstName',
      id: 'firstName',
      isError: !!errors.firstName?.message,
      placeholder: 'Enter first name',
      required: true,
      ...register('firstName'),
    },
    {
      helperText: errors.lastName?.message,
      hidden: updateForm !== 'lastName',
      id: 'lastName',
      isError: !!errors.lastName?.message,
      placeholder: 'Enter last name',
      required: true,
      ...register('lastName'),
    },
    {
      helperText: errors.contactNumber?.message,
      hidden: updateForm !== 'contactNumber',
      id: 'contactNumber',
      isError: !!errors.contactNumber?.message,
      placeholder: 'Enter contact number',
      required: true,
      ...register('contactNumber'),
    },
  ] as const;

  return { errors, fields, isLoading, onSubmit };
}
