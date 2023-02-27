import { Avatar, User } from '@prisma/client';
import { UpdateableUserData } from '@/services/user-service';
import { validate } from '@/utils/validation-utils';
import { ValidationError } from '@/utils/error-utils';

export const deleteUserBySID = async () => {
  const res = await fetch('/api/users/sid', {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw await res.json();
  const user: User & { avatar: Avatar | null } = await res.json();
  return user;
};

export const UpdateableUserDataSchema = validate.object({
  username: validate.optional(validate.user.username),
  firstName: validate.optional(validate.user.firstName),
  lastName: validate.optional(validate.user.lastName),
  contactNumber: validate.optional(validate.user.contactNumber),
  newUser: validate.user.newUser.optional(),
});

export function validateUpdateableUserData(data: any) {
  const result = UpdateableUserDataSchema.safeParse(data);
  if (!result.success)
    throw new ValidationError<UpdateableUserData>(result.error);
  return result.data;
}

export const updateUserBySID = async (data: UpdateableUserData) => {
  const res = await fetch('/api/users/sid', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  const user: User & { avatar: Avatar | null } = await res.json();
  return user;
};
