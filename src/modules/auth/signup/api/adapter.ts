import { User } from '@prisma/client';

export interface SignupData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  password: string;
  confirmPassword?: string;
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
  const user: User = await res.json();
  return user;
};
