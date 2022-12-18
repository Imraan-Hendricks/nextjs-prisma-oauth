import { clsx } from 'clsx';
import { ChangeEvent, FocusEvent, forwardRef, PropsWithChildren } from 'react';

type OnBlur = (e: FocusEvent<HTMLInputElement, Element>) => void;

type OnChange = (e: ChangeEvent<HTMLInputElement>) => void;

type OnFocus = (e: FocusEvent<HTMLInputElement, Element>) => void;

interface CheckboxProps {
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
  id?: string;
  inputProps?: { className?: string };
  label?: string;
  labelProps?: { className?: string };
  name: string;
  onBlur?: OnBlur;
  onChange?: OnChange;
  onFocus?: OnFocus;
}

export const Checkbox = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CheckboxProps>
>(
  (
    {
      children,
      className,
      disabled,
      hidden,
      id,
      inputProps,
      label,
      labelProps,
      name,
      onChange,
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          'flex items-center',
          hidden && 'hidden',
          disabled && 'opacity-70',
          className
        )}>
        <input
          disabled={disabled}
          id={id}
          name={name}
          ref={ref}
          type='checkbox'
          className={clsx(
            'cursor-pointer accent-blue-500 hover:accent-blue-600',
            disabled && 'cursor-default',
            inputProps?.className
          )}
          onChange={onChange}
        />
        {children ? (
          <>{children}</>
        ) : (
          <div className='ml-2'>
            <label
              htmlFor={id}
              className={clsx(
                'text-caption text-gray-600 cursor-pointer',
                disabled && 'cursor-default',
                labelProps?.className
              )}>
              {label}
            </label>
          </div>
        )}
      </div>
    );
  }
);
