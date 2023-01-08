import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction } from 'react';

interface BarsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Bars({ isOpen, setIsOpen }: BarsProps) {
  function toggle() {
    setIsOpen((open) => !open);
  }

  return (
    <div
      className='group mx-5 block sm:hidden cursor-pointer border p-1 rounded hover:bg-white active:bg-gray-50'
      onClick={toggle}>
      {!isOpen && (
        <Bars3Icon className='w-8 h-8 text-gray-500 group-hover:text-gray-700 group-active:text-gray-500' />
      )}
      {isOpen && (
        <XMarkIcon className='w-8 h-8 text-gray-500 group-hover:text-gray-700 group-active:text-gray-500' />
      )}
    </div>
  );
}
