import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProviders } from './providers';
import { useRouter } from 'next/router';

export function Oauth() {
  const oauthError = useRouter().query.oauthError as string | undefined;

  return (
    <div className='grid grid-cols-1 gap-8 justify-items-center sm:min-w-[360px]'>
      {getProviders().map(({ href, icon, text }) => (
        <Link
          key={href}
          href={href}
          className='group flex justify-center items-center px-10 py-2.5 cursor-pointer border rounded-md border-gray-300 hover:bg-gray-200 active:bg-gray-100 w-full'>
          <FontAwesomeIcon
            className='w-6 h-6 text-blue-500 group-hover:text-blue-600'
            icon={icon}
          />
          <span className='text-body1 ml-4 text-gray-500'>{text}</span>
        </Link>
      ))}
      <p className='text-body2 text-red-500 text-center'>{oauthError}</p>
    </div>
  );
}
