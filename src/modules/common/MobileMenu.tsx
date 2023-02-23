import Link from 'next/link';
import { Button } from '@/components/Button';
import { clsx } from 'clsx';
import { useNavbar } from './useNavbar';
import { Redirect } from '@/components/Redirect';
import { sessionQueryOptions } from '@/api/auth/session/adapter';
import { useQuery } from '@tanstack/react-query';

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const { active } = useNavbar();

  const { data: session, isError } = useQuery(sessionQueryOptions);

  if (isError) return <Redirect to='/500' />;

  return (
    <div
      className={clsx(
        'fixed sm:hidden left-0 top-[66px] w-full px-5 z-50 bg-gray-50 overflow-hidden transition-all duration-300',
        isOpen ? 'h-full' : 'h-0'
      )}>
      <div className='grid gap-2'>
        {(
          [
            {
              color: active === '/' ? 'blue' : 'black',
              href: '/',
              name: 'Home',
            },
            {
              color: active === '/blog' ? 'blue' : 'black',
              href: '/blog',
              name: 'Blog',
            },
            {
              color: active === '/support' ? 'blue' : 'black',
              href: '/support',
              name: 'Support',
            },
          ] as const
        ).map(({ color, href, name }) => (
          <Link key={href} href={href}>
            <Button variant='text' className='w-full' color={color}>
              {name}
            </Button>
          </Link>
        ))}
        {!session?.user && (
          <div className='grid grid-cols-2 gap-2 w-max mx-auto my-2'>
            <Link href='/auth/signin'>
              <Button variant='outlined'>Sign In</Button>
            </Link>
            <Link href='/auth/signup'>
              <Button color='black'>Sign Up</Button>
            </Link>
          </div>
        )}
        {session?.user && (
          <div className='grid grid-cols-2 gap-2 w-max mx-auto my-2'>
            <Link href='/account/profile'>
              <Button>My Account</Button>
            </Link>
            <Link href='/auth/signout'>
              <Button color='black'>Sign Out</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
