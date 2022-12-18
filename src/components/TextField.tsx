import { ChangeEvent, FocusEvent, forwardRef, useState } from 'react';
import { clsx } from 'clsx';

type OnBlur = (e: FocusEvent<HTMLInputElement, Element>) => void;

type OnChange = (e: ChangeEvent<HTMLInputElement>) => void;

type OnFocus = (e: FocusEvent<HTMLInputElement, Element>) => void;

interface TextFieldProps {
  autoComplete?: 'on' | 'off';
  className?: string;
  disabled?: boolean;
  helperText?: string;
  helperTextProps?: { className?: string };
  hidden?: boolean;
  id?: string;
  inputProps?: { className?: string };
  isError?: boolean;
  label?: string;
  labelProps?: { className?: string };
  name: string;
  onBlur?: OnBlur;
  onChange?: OnChange;
  onFocus?: OnFocus;
  placeholder?: string;
  required?: boolean;
  type?: 'email' | 'number' | 'password' | 'text';
  value?: string | number;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      autoComplete = 'off',
      className,
      disabled,
      helperText,
      helperTextProps,
      hidden,
      id,
      isError,
      inputProps,
      label,
      labelProps,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      required,
      type,
      value,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleOnBlur: OnBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const handleOnChange: OnChange = (e) => {
      if (onChange) onChange(e);
    };

    const handleOnFocus: OnFocus = (e) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    return (
      <div
        className={clsx(
          'grid grid-cols-1 gap-4 h-max',
          hidden && 'hidden',
          disabled && 'opacity-70',
          className
        )}>
        <label
          className={clsx(
            'text-body1-bold cursor-pointer',
            !label && 'hidden',
            disabled && 'cursor-default',
            isError && [
              isFocused && 'text-blue-500',
              !isFocused && 'text-red-500',
            ],
            !isError && [
              isFocused && 'text-blue-500',
              !isFocused && 'text-gray-900',
            ],
            labelProps?.className
          )}
          htmlFor={id}>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          autoComplete={autoComplete}
          className={clsx(
            'text-body1 w-full py-2.5 px-4 appearance-none border-2 rounded-md',
            'bg-gray-50 focus:bg-white text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-blue-500 accent-blue-500',
            [isError && 'border-red-500', !isError && 'border-gray-300'],
            inputProps?.className
          )}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          placeholder={placeholder}
          ref={ref}
          type={type}
          value={value}
        />
        <p
          className={clsx(
            'text-body2',
            !helperText && 'hidden',
            isError && [
              isFocused && 'text-blue-500',
              !isFocused && 'text-red-500 italic',
            ],
            !isError && [
              isFocused && 'text-blue-500',
              !isFocused && 'text-gray-500',
            ],
            helperTextProps?.className
          )}>
          {helperText}
        </p>
      </div>
    );
  }
);
