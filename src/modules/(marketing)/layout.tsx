import { Footer } from './Footer';
import { Header } from './Header';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col h-screen'>
      <header>
        <Header />
      </header>

      <main className='grow'>{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
