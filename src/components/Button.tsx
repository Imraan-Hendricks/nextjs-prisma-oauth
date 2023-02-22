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
            'bg-transparent hover:bg-gray-100 disabled:hover:bg-transparent active:bg-transparent disabled:active:bg-transparent border-transparent text-black',
          color === 'blue' &&
            'bg-transparent hover:bg-gray-100 disabled:hover:bg-transparent active:bg-transparent disabled:active:bg-transparent border-transparent text-blue-500',
        ],
        variant === 'contained' && [
          color === 'black' &&
            'bg-black hover:bg-gray-800 disabled:hover:bg-black active:bg-black disabled:active:bg-black text-white',
          color === 'blue' &&
            'bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-500 active:bg-blue-500 disabled:active:bg-blue-500 text-white',
        ],
        variant === 'outlined' && [
          color === 'black' && [
            'bg-white hover:bg-gray-100 disabled:hover:bg-white active:bg-white disabled:active:bg-white text-black',
            'border-black hover:border-gray-800 disabled:hover:border-black active:border-black disabled:active:border-black',
          ],
          color === 'blue' && [
            'bg-white hover:bg-gray-100 disabled:hover:bg-white active:bg-white disabled:active:bg-white text-blue-500',
            'border-blue-500 hover:border-blue-600 disabled:hover:border-blue-500 active:border-blue-500 disabled:active:border-blue-500',
          ],
        ],
        className
      )}>
      {!loading ? <>{children}</> : 'loading...'}
    </button>
  );
}
