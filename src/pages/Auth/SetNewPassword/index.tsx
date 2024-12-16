import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { FormValues } from '@/@types/auth';
import FormField from '@/components/FormField';
import { LogoSection } from '@/components/header/HeaderComponents';
import { Button } from '@/components/ui/button';
import { strings } from '@/locales';
import { PUBLIC_ROUTES } from '@/routes';
import { setNewPassword } from '@/services/authService';
import { clearAS } from '@/utils/localStorage';
import {
  confirmPasswordValidation,
  validationRules,
} from '@/utils/validationSchema';

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, verificationCode } = location.state || {};

  const handleSetNewPassword = async (data: FormValues) => {
    if (!email || !verificationCode) {
      toast.error('Email or Verification Code is missing!');
      return;
    }

    const response = await setNewPassword({
      email,
      otp: verificationCode,
      password: data.newPassword,
    });

    if (response) {
      navigate(PUBLIC_ROUTES.SIGNIN);
      clearAS();
    }
  };

  const {
    control,
    getValues,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (watch('newPassword') && watch('confirmPassword')) {
      trigger('confirmPassword');
    }
  }, [watch('newPassword'), trigger]);

  return (
    <div className='h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6'>
      <div className='absolute top-0 left-0 p-4 sm:p-6'>
        <LogoSection navigate={() => {}} />
      </div>
      <div className='max-w-lg w-full bg-black p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold text-center text-white mb-6'>
          {strings.Auth.setNewPassword}
        </h2>

        <form
          className='space-y-4'
          onSubmit={handleSubmit(handleSetNewPassword)}
        >
          <div>
            <Controller
              name='newPassword'
              control={control}
              rules={validationRules.passwordValidation}
              render={({ field }) => (
                <FormField
                  {...field}
                  type='password'
                  placeholder={strings.Auth.newPassword}
                  errors={errors}
                  isRequired
                />
              )}
            />
          </div>

          <div>
            <Controller
              name='confirmPassword'
              control={control}
              rules={confirmPasswordValidation(getValues, 'newPassword')}
              render={({ field }) => (
                <FormField
                  {...field}
                  type='password'
                  placeholder={strings.Auth.confirmPassword}
                  errors={errors}
                  isRequired
                />
              )}
            />
          </div>

          <div className='flex gap-3 mt-4'>
            <Button
              className='bg-grayBackground text-white w-full md:text-lg font-medium rounded-full h-14'
              onClick={() => {
                navigate(PUBLIC_ROUTES.SIGNIN);
              }}
            >
              {strings.Auth.backToLogin}
            </Button>
            <Button
              type='submit'
              onClick={() => {}}
              className='w-full bg-subscriptionRed text-white font-medium rounded-full h-14'
            >
              {strings.Auth.reset}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
