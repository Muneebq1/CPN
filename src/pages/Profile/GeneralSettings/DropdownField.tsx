import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';

import { IDropdownOption, IGeneralSettings } from '@/@types/profile';
import Dropdown from '@/components/Dropdown';
import { Typography } from '@/components/Typography';
import { GeneralSettingsFields } from '@/constants/profile';

interface DropdownFieldProps {
  label: string;
  name: GeneralSettingsFields;
  errors: FieldErrors<IGeneralSettings>;
  options: IDropdownOption[];
  getValue: UseFormGetValues<IGeneralSettings>;
  setValue: UseFormSetValue<IGeneralSettings>;
}

const DropdownField = ({
  label,
  name,
  errors,
  options,
  getValue,
  setValue,
}: DropdownFieldProps) => (
  <div className='space-y-2'>
    <Typography variant='lg' className='font-normal'>
      {label}
    </Typography>
    <Dropdown
      options={options}
      selectedValue={
        options.find((item) => item.value === getValue(name))?.label || ''
      }
      placeholder={`Select ${label}`}
      onSelect={(value) => setValue(name, value)}
    />
    {errors[name] && <p className='text-red-500'>{errors[name]?.message}</p>}
  </div>
);

export default DropdownField;
