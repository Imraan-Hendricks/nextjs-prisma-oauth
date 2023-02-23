import { Footer } from '../common/Footer';
import { Header } from '../common/Header';
import { PropsWithChildren } from 'react';

export default function BlogLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
