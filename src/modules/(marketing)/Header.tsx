import Link from 'next/link';
import { Button } from '@/components/Button';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';

export function Header() {
  const { data: session, isError } = useQuery(sessionQueryOptions);

  if (isError) return <Redirect to='/500' />;

  return (
    <header className='py-3 px-5 bg-gray-50'>
      <nav className='container mx-auto flex justify-end items-center animate-[fade-in_2s_ease_forwards]'>
        {!session?.user && (
          <div className='grid grid-cols-2 gap-2'>
            <Link href='/auth/signin'>
              <Button variant='outlined'>Sign In</Button>
            </Link>
            <Link href='/auth/signup'>
              <Button color='black'>Sign Up</Button>
            </Link>
          </div>
        )}
        {session?.user && (
          <div className='grid grid-cols-2 gap-2'>
            <Link href='/account/profile'>
              <Button>My Account</Button>
            </Link>
            <Link href='/auth/signout'>
              <Button color='black'>Sign Out</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
