import { Avatar, User } from '@prisma/client';
import { validate } from '@/utils/validation-utils';
import { ValidationError } from '@/utils/error-utils';

export interface SigninData {
  email: string;
  password: string;
}

export const SigninSchema = validate.object({
  email: validate.user.email,
  password: validate.misc.anyString,
});

export function validateSigninData(data: any) {
  const result = SigninSchema.safeParse(data);
  if (!result.success) throw new ValidationError<SigninData>(result.error);
  return result.data;
}

export const signin = async (data: SigninData) => {
  const res = await fetch('/api/auth/signin', {
    method: 'POST',
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
