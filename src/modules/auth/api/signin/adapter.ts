import { schema, validate } from '../../../../utils/validation-utils';
import { User } from '@prisma/client';

export interface SigninData {
  email: string;
  password: string;
}

export const SigninSchema = schema.object({
  email: validate.user.email,
  password: validate.misc.anyString,
});

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
  const user: User = await res.json();
  return user;
};
