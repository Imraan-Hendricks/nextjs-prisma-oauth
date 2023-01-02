import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar/Sidebar';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className='flex bg-gray-50'>
      <Sidebar />
      <div className='w-full min-h-screen bg-white'>{children}</div>
    </div>
  );
}