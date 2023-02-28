import { Avatar, User } from '@prisma/client';

interface Put {
  response: User & { avatar: Avatar | null };
}

export const put = {
  mutate: async function (data: FormData) {
    const res = await fetch('/api/users/avatars/upload/sid', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: data,
    });
    if (!res.ok) throw await res.json();
    const user: Put['response'] = await res.json();
    return user;
  },
};

export interface UploadAvatarBySidAdapter {
  put: Put;
}

export const uploadAvatarBySidAdapter = {
  put,
};
