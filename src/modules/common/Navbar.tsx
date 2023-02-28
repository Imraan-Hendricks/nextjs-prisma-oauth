import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/Button';
import { clsx } from 'clsx';
import { MobileMenu } from './MobileMenu';
import { Redirect } from '@/components/Redirect';
import { sessionAdapter } from '@/api/auth/session/session-adapter';
import { useNavbar } from './NavbarContext';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface NavbarProps {
  hideLinks?: boolean;
}

export function Navbar({ hideLinks }: NavbarProps) {
  const { active } = useNavbar();

  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  const { data: session, isError } = useQuery(sessionAdapter.get.getOptions());

  if (isError) return <Redirect to='/500' />;

  return (
    <div className='py-3 px-5 bg-gray-50'>
      <nav
        className={clsx(
          'container mx-auto flex justify-end sm:justify-between items-center animate-[fade-in_2s_ease]',
          hideLinks && 'invisible'
        )}>
        <div className='block sm:hidden' onClick={toggle}>
          <Button color='blue'>
            {!isOpen && <Bars3Icon className='w-6 h-6' />}
            {isOpen && <XMarkIcon className='w-6 h-6' />}
          </Button>
        </div>
        <MobileMenu isOpen={isOpen} />
        <div className='hidden sm:grid grid-cols-3 gap-2'>
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
        </div>
        {!session?.user && (
          <div className='hidden sm:grid grid-cols-2 gap-2'>
            <Link href='/auth/signin'>
              <Button variant='outlined'>Sign In</Button>
            </Link>
            <Link href='/auth/signup'>
              <Button color='black'>Sign Up</Button>
            </Link>
          </div>
        )}
        {session?.user && (
          <div className='hidden sm:grid grid-cols-2 gap-2'>
            <Link href='/account/profile'>
              <Button>My Account</Button>
            </Link>
            <Link href='/auth/signout'>
              <Button color='black'>Sign Out</Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
