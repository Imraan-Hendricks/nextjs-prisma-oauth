import { User } from '@prisma/client';

export const uploadAvatarBySID = async (data: FormData) => {
  const res = await fetch('/api/users/avatars/upload/sid', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
    },
    body: data,
  });
  if (!res.ok) throw await res.json();
  const user: User = await res.json();
  return user;
};
