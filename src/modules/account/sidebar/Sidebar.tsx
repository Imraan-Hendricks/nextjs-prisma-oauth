import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { Avatar } from './avatar/Avatar';
import { Menu } from './menu/Menu';

export function Sidebar() {
  return (
    <div className='grid gap-8 py-8 h-max'>
      <Avatar />
      <div className='grid gap-4'>
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
