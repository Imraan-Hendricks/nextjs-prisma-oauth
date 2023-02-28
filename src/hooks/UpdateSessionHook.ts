import {
  SessionAdapter,
  sessionAdapter,
} from '../api/auth/session/session-adapter';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useUpdateSession(options?: SessionAdapter['get']['options']) {
  const { push } = useRouter();

  const { refetch } = useQuery({
    ...sessionAdapter.get.getOptions(),
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
