import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NavbarProvider } from '@/modules/common/useNavbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarProvider>
        <Component {...pageProps} />
      </NavbarProvider>
    </QueryClientProvider>
  );
}
