import { User } from '@prisma/client';

export type Session = { user: User } | { user: undefined };

export const sessionQueryKey = 'session';
export const sessionQueryOptions = { staleTime: 0, cacheTime: 5000 };

export const fetchSession = async () => {
  const res = await fetch(`/api/auth/session?timestamp=${Date.now()}`);
  if (!res.ok) throw await res.json();
  const session: Session = await res.json();
  return session;
};
