import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Avatar } from './Avatar';
import { Bars } from './Bars';
import { clsx } from 'clsx';
import { Menu } from './Menu';
import { useState } from 'react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='grid gap-8 py-4 sm:py-8 h-max'>
      <div className='flex justify-between items-center'>
        <Avatar />
        <Bars isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={clsx('grid gap-4', !isOpen && 'hidden sm:block')}>
        <Menu
          items={[
            { Icon: HomeIcon, name: 'Home', href: '/' },
            {
              Icon: UserCircleIcon,
              name: 'Profile',
              href: '/account/profile',
            },
            {
              Icon: Cog6ToothIcon,
              name: 'Settings',
              href: '/account/settings',
            },
          ]}
        />
        <hr />
        <Menu
          items={[
            {
              Icon: TrashIcon,
              name: 'Delete Account',
              href: '/account/delete-account',
            },
            {
              Icon: ArrowLeftOnRectangleIcon,
              name: 'Signout',
              href: '/auth/signout',
            },
          ]}
        />
      </div>
    </div>
  );
}
