import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

export function Header() {
  const { push } = useRouter();
  return (
    <header className='py-5 px-5 bg-gray-50'>
      <nav className='flex justify-between items-center'>
        <h1>Header</h1>
        <UserCircleIcon
          className='w-7 h-7 text-blue-500 hover:text-blue-700 cursor-pointer'
          onClick={() => push('/auth/signin')}
        />
      </nav>
    </header>
  );
}
