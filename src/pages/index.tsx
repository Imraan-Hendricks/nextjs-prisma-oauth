import Head from 'next/head';
import { MarketingLayout } from '../components/layouts/Marketing';

export default function Home() {
  return (
    <div>
      <PageHead />
      <MarketingLayout>
        <section>
          <Hero />
        </section>
      </MarketingLayout>
    </div>
  );
}

function PageHead() {
  return (
    <Head>
      <title>Next.js v12 Closure | Home</title>
      <link rel='icon' href='/favicon.ico' />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='author' content='Imraan Hendricks' />
      <meta
        name='description'
        content='A conclusion to Next.js v12 that intends to consolidate the best ideas and practices up to this point'
      />
      <meta
        name='keywords'
        content='MongoDB, Next.js, React, React Query, Tailwind'
      />
    </Head>
  );
}

function Hero() {
  return (
    <div>
      <h1 className='text-3xl'>Home</h1>
    </div>
  );
}
