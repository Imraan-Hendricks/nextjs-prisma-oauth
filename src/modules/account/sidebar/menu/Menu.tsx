import Link from 'next/link';
import { clsx } from 'clsx';
import { HeroIcon } from '../../../../utils/types';
import { useRouter } from 'next/router';

interface MenuProps {
  items: {
    Icon: HeroIcon;
    name: string;
    href: string;
  }[];
}

export function Menu({ items }: MenuProps) {
  const { asPath } = useRouter();

  function isActive(path: string) {
    if (path.substring(0, 8) === '/account')
      if (asPath.substring(0, path.length) === path) return true;
  }

  return (
    <ul>
      {items.map(({ Icon, name, href }) => (
        <li key={name}>
          <Link
            href={href}
            className={clsx(
              'group flex items-center px-5 py-5',
              isActive(href)
                ? 'bg-gray-200 hover:bg-gray-200'
                : 'hover:bg-gray-100'
            )}>
            <Icon
              className={clsx(
                'w-6 h-6 mr-2 group-hover:text-blue-500',
                isActive(href) ? 'text-blue-500' : 'text-gray-400'
              )}
            />
            <span
              className={clsx(
                'text-body2 group-hover:text-blue-600',
                isActive(href) && 'text-blue-600'
              )}>
              {name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
