import { Controller } from 'react-hook-form';

import { FormFieldProps } from '@/@types/profile';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/ui/input';

const FormField = ({
  label,
  placeholder,
  name,
  control,
  errors,
  type = 'text',
  validation,
  value,
  disabled,
}: FormFieldProps) => (
  <div className='space-y-2'>
    <Typography variant='lg' className='font-normal'>
      {label} {validation ? <span className='text-red-500'>*</span> : null}
    </Typography>

    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field }) => (
        <Input
          {...field}
          type={type}
          id={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className='w-full bg-grayBackground md:bg-black rounded-full py-6 px-5 placeholder-lightGray placeholder:opacity-50 border-none'
        />
      )}
    />

    {validation && errors[name] ? (
      <p className='text-red-500'>{errors[name]?.message}</p>
    ) : null}
  </div>
);

export default FormField;
