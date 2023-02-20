import Link from 'next/link';
import {
  faFacebook,
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { oauthProviders } from '@/utils/constant';
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

function getIcon(
  provider:
    | 'facebook'
    | 'github'
    | 'google'
    | 'instagram'
    | 'linkedin'
    | 'tiktok'
    | 'twitter'
) {
  return provider === 'facebook'
    ? faFacebook
    : provider === 'github'
    ? faGithub
    : provider === 'google'
    ? faGoogle
    : provider === 'instagram'
    ? faInstagram
    : provider === 'linkedin'
    ? faLinkedin
    : provider === 'tiktok'
    ? faTiktok
    : provider === 'twitter'
    ? faTwitter
    : faRightToBracket;
}

function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getProviders() {
  return oauthProviders.map((provider) => {
    return {
      href: `/api/auth/oauth/${provider}`,
      icon: getIcon(provider),
      text: `Signin with ${capitalizeFirst(provider)}`,
    };
  });
}
