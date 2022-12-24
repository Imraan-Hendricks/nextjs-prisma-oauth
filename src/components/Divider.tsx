import { clsx } from 'clsx';
import { PropsWithChildren } from 'react';

export function Divider({
  children,
  className,
}: PropsWithChildren<{ className: string }>) {
  if (!children) return <hr className={clsx('w-full my-3', className)} />;
  return (
    <div className={clsx('flex justify-center items-center w-full', className)}>
      <hr className='w-full mr-2' />
      <p className='text-body text-gray-500 min-w-fit'>{children}</p>
      <hr className='w-full ml-2' />
    </div>
  );
}
