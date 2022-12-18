import { clsx } from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  className,
  children,
  loading,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(
        'inline-block py-3 px-8 rounded-md border border-transparent transition-colors',
        'text-white text-button text-center',
        'bg-blue-600 hover:bg-blue-700 active:bg-blue-500 disabled:hover:bg-blue-600',
        'hover:shadow-xl active:shadow-none disabled:hover:shadow-none disabled:opacity-70',
        className
      )}
      {...rest}>
      {!loading ? <>{children}</> : 'loading...'}
    </button>
  );
}
