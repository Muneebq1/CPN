import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { IGeneralSettings } from '@/@types/profile';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { GeneralSettingsField } from '@/constants/profile';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { strings } from '@/locales';
import { fetchUserDetails } from '@/redux/slices/auth';
import { updateUserData } from '@/services/userService';

import DropdownField from './DropdownField';
import FormField from './FormField';

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userDetails, user } = useAppSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IGeneralSettings>({});

  useEffect(() => {
    if (userDetails) {
      setValue('username', userDetails.username || '');
      setValue('email', userDetails.email || '');
      setValue('phone_number', userDetails.phone_number || '');
      setValue('gender', userDetails.gender || '');
      setValue('country_id', userDetails.country_id || '');
      setValue(
        'verification',
        Number(userDetails.verified) === 0 ? 'Not Verified' : 'Verified',
      );
    }
  }, [userDetails, setValue]);

  const onSubmit: SubmitHandler<IGeneralSettings> = async (data) => {
    setIsLoading(true);
    delete data.username;
    delete data.verification;
    const response = await updateUserData(data);
    if (response) {
      dispatch(
        fetchUserDetails({
          data: {
            user_id: user?.userId as string,
            fetch: 'user_data',
          },
        }),
      );
      navigate(-1);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Typography variant='title' className='mb-8 text-start font-semibold'>
        {strings.Profile.generalSettings}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8'>
          {GeneralSettingsField.map((field, index) => {
            if (field.options) {
              return (
                <DropdownField
                  key={index}
                  label={field.label}
                  name={field.name}
                  errors={errors}
                  options={field.options(setValue)}
                  getValue={getValues}
                  setValue={setValue}
                />
              );
            }
            return (
              <FormField
                key={index}
                label={field.label}
                value={getValues(field.name)}
                disabled={field?.isDisabled}
                placeholder={field?.placeholder}
                name={field.name}
                control={control}
                errors={errors}
                validation={field?.validation}
                type={field.type}
              />
            );
          })}
        </div>

        <div className='flex justify-center items-center mt-12'>
          <Button
            type='submit'
            loading={isLoading}
            className='bg-subscriptionRed w-full mx-5 md:text-lg md:w-1/3 font-medium rounded-full h-14'
          >
            {strings.save}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
