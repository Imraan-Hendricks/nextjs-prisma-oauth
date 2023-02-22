import Link from 'next/link';

export function Hero() {
  return (
    <section className='flex justify-center items-center h-full'>
      <div className='px-5 grid gap-10 animate-[fade-in_2s_ease]'>
        <div>
          <img src='/next.js-logo.svg' alt='Next.js Logo' className='mx-auto' />
        </div>
        <div className='grid gap-2'>
          <h1 className='text-h4-bold text-center'>
            Prisma <span className='text-blue-600'>OAuth2</span> SQLite
          </h1>
          <p className='text-body1 text-center text-gray-600 max-w-2xl'>
            The focus of this project is to showcase the implementation of
            authentication using Next.js, OAuth2 and Prisma. Try an access the
            account page below.
          </p>
        </div>
        <div>
          <div className='mx-auto w-max'>
            <Link
              href='/account/profile'
              className='text-body1-bold text-blue-600 hover:text-blue-400'>
              My Account
            </Link>
            <span className='text-body1-bold text-gray-700 mx-2'>|</span>
            <Link
              href='https://github.com/Imraan-Hendricks/nextjs-prisma-oauth'
              className='text-body1-bold text-gray-700 hover:text-gray-400'>
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
