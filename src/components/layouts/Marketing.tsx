import { Footer } from '../sections/Footer';
import { Header } from '../sections/Header';
import { PropsWithChildren } from 'react';

export function MarketingLayout({ children }: PropsWithChildren<unknown>) {
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
