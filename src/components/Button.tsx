import { clsx } from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined';
}

export function Button({
  className,
  children,
  loading,
  variant = 'contained',
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={clsx(
        'inline-block py-3 px-8 text-button text-center rounded-md border transition-colors',
        'hover:shadow-xl active:shadow-none disabled:hover:shadow-none disabled:opacity-70',
        variant === 'contained' && [
          'text-white border-transparent',
          'bg-blue-600 hover:bg-blue-700 active:bg-blue-500 disabled:hover:bg-blue-600',
        ],
        variant === 'outlined' && [
          'text-blue-600 hover:text-blue-700 active:text-blue-500 disabled:hover:text-blue-600',
          'bg-transparent border-blue-600 hover:border-blue-700 active:border-blue-500 disabled:hover:border-blue-600',
        ],
        className
      )}
      {...rest}>
      {!loading ? <>{children}</> : 'loading...'}
    </button>
  );
}
