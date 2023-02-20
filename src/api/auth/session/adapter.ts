import { UseQueryOptions } from '@tanstack/react-query';
import { User } from '@prisma/client';

export type Session = { user: User } | { user: undefined };

export async function fetchSession() {
  const res = await fetch(`/api/auth/session?timestamp=${Date.now()}`);
  if (!res.ok) throw await res.json();
  const session: Session = await res.json();
  return session;
}

export type SessionQueryOptions = Omit<
  UseQueryOptions<Session, unknown, Session, string[]>,
  'initialData'
> & {
  initialData?: (() => undefined) | undefined;
};

export const sessionQueryOptions: SessionQueryOptions = {
  queryKey: ['session'],
  queryFn: fetchSession,
  staleTime: 15 * (60 * 1000),
  cacheTime: 24 * (60 * 60 * 1000),
};
