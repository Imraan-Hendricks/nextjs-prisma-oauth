import PageHead from 'next/head';

export default function Head() {
  return (
    <PageHead>
      <title>Next.js v12 Closure | Profile</title>
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
        content='Next.js, Prisma, React, React Query, SQL, SQLite,Tailwind'
      />
    </PageHead>
  );
}
