import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useClickAwayListener } from '@/hooks/useClickAwayListener';
import { useRef } from 'react';

interface PreviewProps {
  isLoading: boolean;
  preview: string;
  onCancellation: () => void;
  onConfirmation: () => void;
}

export function Preview({
  isLoading,
  preview,
  onCancellation,
  onConfirmation,
}: PreviewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useClickAwayListener(ref, onCancellation);

  return (
    <div ref={ref} className='grid gap-4'>
      <img src={preview} alt='avatar' className='rounded-full' />
      <div className='grid grid-cols-2 justify-items-center w-max mx-auto gap-4'>
        {!isLoading && (
          <>
            <XCircleIcon
              className='w-10 h-10 text-red-500 hover:text-red-400 active:text-red-600 cursor-pointer'
              onClick={onCancellation}
            />
            <CheckCircleIcon
              className='w-10 h-10 text-green-600 hover:text-green-500 active:text-green-700 cursor-pointer'
              onClick={onConfirmation}
            />
          </>
        )}
        {isLoading && (
          <div className='col-span-2'>
            <FontAwesomeIcon
              icon={faCircleNotch}
              className='w-9 h-9 text-gray-300 animate-spin'
            />
          </div>
        )}
      </div>
    </div>
  );
}
