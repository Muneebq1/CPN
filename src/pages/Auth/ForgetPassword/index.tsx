/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FormValues } from '@/@types/auth';
import FormField from '@/components/FormField';
import { LogoSection } from '@/components/header/HeaderComponents';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { strings } from '@/locales';
import { PUBLIC_ROUTES } from '@/routes';
import { forgotPassword } from '@/services/authService';
import { validationRules } from '@/utils/validationSchema';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otpStep, setOtpStep] = useState(false);

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormValues>();

  const handleEmailSubmit = async (data: FormValues) => {
    const response = await forgotPassword({
      email: data.email,
      type: 'send',
    });
    if (response) {
      setEmail(data.email);
      setOtpStep(true);
      resetField('email');
    }
  };

  const handleOtpSubmit = async (data: FormValues) => {
    const response = await forgotPassword({
      email,
      type: 'verify',
      otp: data.verificationCode,
    });
    if (response) {
      toast.success('OTP verified successfully!');
      navigate(PUBLIC_ROUTES.SET_NEW_PASSWORD, {
        state: { email, verificationCode: data.verificationCode },
      });
    }
  };

  return (
    <div className='h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6'>
      <div className='absolute top-0 left-0 p-4 sm:p-6'>
        <LogoSection navigate={() => {}} />
      </div>
      <div className='max-w-lg w-full bg-black p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold text-center text-white mb-6'>
          {strings.Auth.forgotPassword}
        </h2>
        {!otpStep ? (
          <form>
            <Typography className='text-white mb-4'>
              {strings.Auth.enterEmail}
            </Typography>
            <div>
              <Controller
                name='email'
                control={control}
                rules={validationRules.email}
                defaultValue={email}
                render={({ field }) => (
                  <FormField
                    {...field}
                    type='text'
                    placeholder={strings.email}
                    errors={errors}
                    isRequired
                  />
                )}
              />
            </div>
          </form>
        ) : (
          <form>
            <p className='text-white mb-4'>{strings.Auth.enterCode}</p>
            <div>
              <Controller
                name='verificationCode'
                control={control}
                rules={validationRules.verificationCode}
                render={({ field }) => (
                  <FormField
                    {...field}
                    type='text'
                    placeholder={strings.Auth.verificationCode}
                    errors={errors}
                    isRequired
                  />
                )}
              />
            </div>
          </form>
        )}
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
            onClick={
              otpStep
                ? handleSubmit(handleOtpSubmit)
                : handleSubmit(handleEmailSubmit)
            }
            className='w-full bg-subscriptionRed text-white font-medium rounded-full h-14'
          >
            {otpStep ? strings.Auth.verifyOtp : strings.Auth.sendEmail}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
