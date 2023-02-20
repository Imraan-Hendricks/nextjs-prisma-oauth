import {
  SessionQueryOptions,
  sessionQueryOptions,
} from '../api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useUpdateSession(options?: SessionQueryOptions) {
  const { push } = useRouter();

  const { refetch } = useQuery({
    ...sessionQueryOptions,
    refetchOnWindowFocus: false,
    enabled: false,
    onError: () => push('/500'),
    ...options,
  });

  async function updateSession() {
    await refetch({ throwOnError: true });
  }

  return { updateSession };
}
