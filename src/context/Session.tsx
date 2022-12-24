import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  fetchSession,
  Session,
  sessionQueryKey,
  sessionQueryOptions,
} from '../api/auth/session/adapter';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from 'react-query';

type Status = 'authenticated' | 'loading' | 'unauthenticated';

interface ContextProps {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
  setStatus: Dispatch<SetStateAction<Status>>;
  status: Status;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<any>) | undefined
  ) => Promise<QueryObserverResult<Session, any>>;
}

const SessionContext = createContext<ContextProps | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error('useSession must be inside a Provider with a value');
  return context;
};

export function SessionProvider({ children }: PropsWithChildren<unknown>) {
  const [status, setStatus] = useState<Status>('loading');
  const [session, setSession] = useState<Session>({ user: undefined });

  const { refetch } = useQuery(sessionQueryKey, fetchSession, {
    ...sessionQueryOptions,
    onError: (error: any) => alert(error.message),
    onSuccess: (session) => {
      setSession(session);
      if (session.user) return setStatus('authenticated');
      setStatus('unauthenticated');
    },
  });

  return (
    <SessionContext.Provider
      value={{ refetch, session, setSession, setStatus, status }}>
      {children}
    </SessionContext.Provider>
  );
}
