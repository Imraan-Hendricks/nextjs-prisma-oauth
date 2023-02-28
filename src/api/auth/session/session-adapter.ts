import { Avatar, User } from '@prisma/client';
import { UseQueryOptions } from '@tanstack/react-query';

export type Session = {
  user?: User & { avatar: Avatar | null };
};

interface Get {
  response: Session;
  options: Omit<
    UseQueryOptions<Session, unknown, Session, string[]>,
    'initialData'
  > & {
    initialData?: (() => undefined) | undefined;
  };
}

const get = {
  query: async function () {
    const res = await fetch(`/api/auth/session?timestamp=${Date.now()}`);
    if (!res.ok) throw await res.json();
    const session: Get['response'] = await res.json();
    return session;
  },

  getOptions: function (): Get['options'] {
    return {
      queryKey: ['session'],
      queryFn: this.query,
      staleTime: 15 * (60 * 1000),
      cacheTime: 24 * (60 * 60 * 1000),
    };
  },
};

export interface SessionAdapter {
  get: Get;
}

export const sessionAdapter = {
  get,
};
