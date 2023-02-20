import { Footer } from './Footer';
import { Header } from './Header';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
