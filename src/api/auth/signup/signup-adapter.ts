import { Avatar, User } from '@prisma/client';
import { validate } from '@/utils/validation-utils';
import { ValidationError } from '@/utils/error-utils';

export interface SignupData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  password: string;
  confirmPassword?: string;
}

export const SignupSchema = validate
  .object({
    username: validate.user.username,
    firstName: validate.user.firstName,
    lastName: validate.user.lastName,
    email: validate.user.email,
    contactNumber: validate.optional(validate.user.contactNumber),
    password: validate.auth.password,
    confirmPassword: validate.optional(validate.auth.confirmPassword),
  })
  .refine(
    (data) =>
      data.confirmPassword === undefined ||
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

export function validateSignupData(data: any) {
  const result = SignupSchema.safeParse(data);
  if (!result.success) throw new ValidationError<SignupData>(result.error);
  return result.data;
}

export const signup = async (data: SignupData) => {
  const res = await fetch('/api/auth/signup', {
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
