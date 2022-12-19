import '../styles/globals.css';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from '../modules/auth/session/SessionContext';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
