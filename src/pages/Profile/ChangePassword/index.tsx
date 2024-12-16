import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { IChangePassword, PasswordType } from '@/@types/profile';
import FormField from '@/components/FormField';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { ChangePasswordValues } from '@/constants';
import { passwordFields } from '@/constants/profile';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { strings } from '@/locales';
import { fetchUserDetails } from '@/redux/slices/auth';
import { updateUserData } from '@/services/userService';
import {
  confirmPasswordValidation,
  validationRules,
} from '@/utils/validationSchema';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IChangePassword>({
    defaultValues: ChangePasswordValues,
  });

  const onSubmit: SubmitHandler<IChangePassword> = async (data) => {
    setIsLoading(true);
    const payload = {
      current_password: data.current_password,
      new_password: data.new_password,
    };
    const response = await updateUserData(payload);
    if (response) {
      dispatch(
        fetchUserDetails({
          data: { user_id: user?.userId as string, fetch: 'user_data' },
        }),
      );
      navigate('/update-profile');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Typography variant='title' className='mb-8 text-start font-semibold'>
        {strings.Profile.password}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-x-10 gap-y-6 w-full md:w-1/2'>
          {passwordFields.map((field) => (
            <Controller
              key={field.name}
              name={field.name as PasswordType}
              control={control}
              rules={
                field.name === PasswordType.Confirm
                  ? confirmPasswordValidation(getValues, PasswordType.New)
                  : validationRules.passwordValidation
              }
              render={({ field: controllerField }) => (
                <FormField
                  {...controllerField}
                  title={field.label}
                  placeholder={field.placeholder}
                  containerClassName='bg-black'
                  errors={errors}
                  type='password'
                  isRequired
                />
              )}
            />
          ))}
        </div>

        <div className='flex justify-center md:justify-start items-center mt-12'>
          <Button
            type='submit'
            loading={isLoading}
            className='bg-subscriptionRed w-full md:text-lg md:w-1/2 font-medium rounded-full h-14'
          >
            {strings.save}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
