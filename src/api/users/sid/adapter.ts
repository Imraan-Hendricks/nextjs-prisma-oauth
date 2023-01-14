import { optional, schema, validate } from '../../../utils/validation';
import { UpdateableUserData } from '../../../services/user';
import { User } from '@prisma/client';
import { ValidationError } from '../../../utils/error';

export const deleteUserBySID = async () => {
  const res = await fetch('/api/users/sid', {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw await res.json();
  const user: User = await res.json();
  return user;
};

export const UpdateableUserDataSchema = schema.object({
  username: optional(validate.user.username),
  firstName: optional(validate.user.firstName),
  lastName: optional(validate.user.lastName),
  contactNumber: optional(validate.user.contactNumber),
  newUser: validate.user.newUser.optional(),
});

export function validateUpdateableUserData(data: any) {
  const result = UpdateableUserDataSchema.safeParse(data);
  if (!result.success)
    throw new ValidationError<UpdateableUserData>('body', result.error);
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
  const user: User = await res.json();
  return user;
};
