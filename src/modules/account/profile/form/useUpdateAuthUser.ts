import { Dispatch, SetStateAction } from 'react';
import { resolver } from '../../../../utils/validation';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { UpdateableUserData } from '../../../../services/user';
import {
  UpdateableUserDataSchema,
  updateAuthUser,
} from '../../../../api/auth/user/adapter';
import { useSession } from '../../../../context/Session';

export type UpdateForm =
  | 'username'
  | 'firstName'
  | 'lastName'
  | 'contactNumber'
  | undefined;

interface UseUpdateAuthUserProps {
  updateForm: UpdateForm;
  setUpdateForm: Dispatch<SetStateAction<UpdateForm | undefined>>;
}

export function useUpdateAuthUser({
  updateForm,
  setUpdateForm,
}: UseUpdateAuthUserProps) {
  const { setSession, setStatus } = useSession();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateableUserData>({
    resolver: resolver(UpdateableUserDataSchema),
  });

  const mutation = useMutation(updateAuthUser, {
    onError: (error: any) => alert(error.message),
    onSuccess: async (user) => {
      setSession({ user });
      setStatus('authenticated');
      setUpdateForm(undefined);
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

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

  return { errors, fields, isLoading: mutation.isLoading, onSubmit };
}
