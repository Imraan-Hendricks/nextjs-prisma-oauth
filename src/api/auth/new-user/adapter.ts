import { User } from '@prisma/client';

export const updateNewUser = async (data = {}) => {
  const res = await fetch('/api/auth/new-user', {
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
