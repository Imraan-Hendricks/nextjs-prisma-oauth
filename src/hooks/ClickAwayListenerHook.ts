import { MutableRefObject, useEffect } from 'react';

export function useClickAwayListener(
  ref: MutableRefObject<any>,
  onClickAway: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
