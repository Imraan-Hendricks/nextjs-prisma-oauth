import { PropsWithChildren } from 'react';
import { Sidebar } from './Sidebar';

export default function AccountLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className='flex flex-col sm:flex-row bg-gray-50'>
      <Sidebar />
      <div className='w-full min-h-screen bg-white'>{children}</div>
    </div>
  );
}
