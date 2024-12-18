/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import DatePicker from 'react-datepicker';

import { cn } from 'src/lib/utils';

import 'react-datepicker/dist/react-datepicker.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    if (type === 'date') {
      return (
        // @ts-ignore
        <DatePicker
          className={cn(
            'w-full flex h-10 rounded-md border border-greyWhite bg-white px-3 py-2 text-sm placeholder:opacity-50 ring-offset-white focus-visible:outline-none dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-[#666666] dark:focus-visible:ring-slate-300',
            className,
          )}
          placeholderText={props.placeholder}
          showYearDropdown
          yearDropdownItemNumber={15}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          scrollableYearDropdown
          selected={props?.value ? new Date(props.value as string) : null}
          {...props}
        />
      );
    }
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-greyWhite bg-white px-3 py-2 text-sm placeholder:opacity-50 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-quickSilver focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-[#666666] dark:focus-visible:ring-slate-300',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
