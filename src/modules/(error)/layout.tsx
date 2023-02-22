import { Footer } from '../common/Footer';
import { Header } from '../common/Header';
import { PropsWithChildren } from 'react';

export default function ErrorLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col h-screen'>
      <Header hideLinks />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
