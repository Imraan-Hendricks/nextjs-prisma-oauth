import Link from 'next/link';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
  return (
    <footer className='px-5 py-4 bg-gray-50'>
      <div className='container mx-auto flex justify-center md:justify-center items-center animate-[fade-in_2s_ease]'>
        <Link href='https://github.com/Imraan-Hendricks/nextjs-prisma-oauth'>
          <FontAwesomeIcon
            icon={faGithub}
            className='w-8 h-8 cursor-pointer hover:text-gray-800 active:text-black'
          />
        </Link>
        <h1 className='ml-4 text-body2 text-gray-500'>
          &copy; Next.js Prisma OAuth
        </h1>
      </div>
    </footer>
  );
}
