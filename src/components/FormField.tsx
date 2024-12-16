/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { strings } from '@/locales';

import { cn } from 'src/lib/utils';

import { Input } from './ui/input';
import { Typography } from './Typography';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
  labelClassName?: string;
  containerClassName?: string;
  name: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  errors?: FieldErrors;
  hideIcon?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  placeholder,
  name,
  value,
  labelClassName,
  containerClassName,
  onChange,
  isRequired,
  errors,
  hideIcon = false,
  type = 'text',
  ...props
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(type === 'password');

  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  const inputType =
    type === 'password' ? (isPasswordHidden ? 'password' : 'text') : type;

  return (
    <label className={cn('flex flex-col', { 'my-2': title })}>
      <div className='flex justify-between items-center pr-1'>
        {title && (
          <Typography
            className={cn(
              'flex md:text-sm capitalize font-semibold',
              labelClassName,
            )}
          >
            {title}
            {isRequired && (
              <span className='text-subscriptionRed text-xl ml-1'>*</span>
            )}
          </Typography>
        )}
      </div>
      <div className='relative'>
        <Input
          name={name}
          placeholder={placeholder}
          className={cn(
            'w-full bg-grayBackground rounded-full py-6 px-5 placeholder:opacity-50 placeholder-lightGray border-none',
            { 'pr-10': type === 'password' },
            containerClassName,
          )}
          value={value}
          onChange={onChange}
          maxLength={50}
          type={inputType}
          {...props}
        />
        {type === 'password' && !hideIcon && (
          <button
            onClick={togglePasswordVisibility}
            className='absolute right-4 top-4'
            type='button'
            aria-label={
              isPasswordHidden ? strings.showPassword : strings.hidePassword
            }
          >
            {isPasswordHidden ? <FiEyeOff size={17} /> : <FiEye size={17} />}
          </button>
        )}
      </div>

      {errors?.[name] && (
        <p className='text-subscriptionRed text-xs mt-1 ml-3'>
          {errors[name]?.message as any}
        </p>
      )}
    </label>
  );
};

export default FormField;
