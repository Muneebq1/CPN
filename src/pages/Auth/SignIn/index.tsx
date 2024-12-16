/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ILoginFields } from '@/@types/auth';
import FormField from '@/components/FormField';
import { LogoSection } from '@/components/header/HeaderComponents';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { strings } from '@/locales';
import { setUser } from '@/redux/slices/auth';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import { loginUser } from '@/services/authService';
import { setItemToAS, setTokenToAS, STORAGE_KEYS } from '@/utils/localStorage';
import { validationRules } from '@/utils/validationSchema';

export const INITIAL_VALUES: ILoginFields = {
  username: '',
  password: '',
  saveLoginInfo: false,
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoginInfo, setSaveLoginInfo] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const staticText = strings.Auth;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
    setIsLoading(true);
    const response = await loginUser(data);
    if (response) {
      const { access_token, user_id: userId } = response;
      dispatch(setUser({ access_token, userId }));
      await setTokenToAS(access_token);
      await setItemToAS(STORAGE_KEYS.USER_ID, userId);
      navigate(ROUTES.DASHBOARD);
    }
    setIsLoading(false);
  };

  return (
    <div className='h-screen bg-black text-white relative'>
      <div className='absolute top-0 left-0 p-4 sm:p-6'>
        <LogoSection navigate={() => {}} />
      </div>

      <div className='flex flex-col items-center justify-center h-full mx-5 md:mx-0'>
        <div className='w-full max-w-sm sm:max-w-md md:max-w-lg'>
          <h2 className='text-3xl sm:text-4xl font-bold mb-6 text-center'>
            {staticText.SignIn}
          </h2>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name='username'
                control={control}
                rules={validationRules.username}
                render={({ field }) => (
                  <FormField
                    {...field}
                    type='text'
                    placeholder='Username'
                    errors={errors}
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name='password'
                control={control}
                rules={validationRules.passwordValidation}
                render={({ field }) => (
                  <FormField
                    {...field}
                    type='password'
                    placeholder='Password'
                    errors={errors}
                  />
                )}
              />
            </div>

            <div className='flex items-center justify-between text-sm'>
              <label className='flex items-center'>
                <Checkbox
                  checked={saveLoginInfo}
                  onCheckedChange={(checked: boolean) => {
                    setSaveLoginInfo(checked);
                  }}
                />
                <span className='ml-2'>{staticText.rememberMe}</span>
              </label>

              <Button
                variant='link'
                onClick={() => navigate(PUBLIC_ROUTES.FORGOT_PASSWORD)}
                className='text-gray-400 no-underline hover:underline w-fit h-fit'
              >
                {staticText.forgotPassword}
              </Button>
            </div>

            <Button
              type='submit'
              className='bg-subscriptionRed w-full md:text-lg font-medium rounded-full h-14'
              disabled={isLoading}
            >
              {isLoading ? staticText.loading : staticText.SignIn}
            </Button>
          </form>

          <div className='flex mt-6 text-sm justify-center items-center'>
            <Typography variant='sm'>{staticText.newUser}</Typography>
            <Button
              onClick={() => navigate(PUBLIC_ROUTES.SIGNUP)}
              variant='link'
              className='text-subscriptionRed font-medium hover:underline w-fit'
            >
              {staticText.signUpNow}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
