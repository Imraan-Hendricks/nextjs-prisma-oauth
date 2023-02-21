import { clsx } from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

interface ButtonProps {
  className?: string;
  color?: 'blue' | 'black';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  variant?: 'text' | 'contained' | 'outlined';
}

export function Button({
  children,
  className,
  color = 'blue',
  disabled = false,
  loading = false,
  onClick,
  variant = 'contained',
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'flex justify-center items-center px-4 py-2 ',
        'text-button border rounded transition-colors',
        'disabled:opacity-70',
        variant === 'text' && [
          color === 'black' &&
            'text-black bg-transparent hover:bg-gray-100 active:bg-transparent border-transparent',
          color === 'blue' &&
            'text-blue-500 bg-transparent hover:bg-gray-100 active:bg-transparent border-transparent',
        ],
        variant === 'contained' && [
          color === 'black' &&
            'bg-black hover:bg-gray-800 active:bg-black text-white',
          color === 'blue' &&
            'bg-blue-500 hover:bg-blue-700 active:bg-blue-500 text-white',
        ],
        variant === 'outlined' && [
          color === 'black' &&
            'border-black hover:border-gray-800 active:border-black bg-white hover:bg-gray-100 active:bg-white text-black',
          color === 'blue' &&
            'border-blue-500 hover:border-blue-600 active:border-blue-500 bg-white hover:bg-gray-100 active:bg-white text-blue-500',
        ],
        className
      )}>
      {!loading ? <>{children}</> : 'loading...'}
    </button>
  );
}
