import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ISignupFields } from '@/@types/auth';
import FormField from '@/components/FormField';
import { LogoSection } from '@/components/header/HeaderComponents';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { INITIAL_VALUES, signUpFields } from '@/constants';
import { strings } from '@/locales';
import { setUser } from '@/redux/slices/auth';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import { signupUser } from '@/services/authService';
import { setItemToAS, setTokenToAS, STORAGE_KEYS } from '@/utils/localStorage';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ISignupFields>({
    mode: 'onSubmit',
    defaultValues: INITIAL_VALUES,
  });
  const staticText = strings.Auth;

  const fields = signUpFields(getValues);

  const onSubmit: SubmitHandler<ISignupFields> = async (data) => {
    setIsLoading(true);
    const response = await signupUser(data);
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
      <div className='absolute top-0 left-0 p-6'>
        <LogoSection navigate={() => {}} />
      </div>

      <div className='flex flex-col items-center justify-center h-full mx-5 md:mx-0'>
        <div className='w-full max-w-sm sm:max-w-md md:max-w-lg'>
          <h2 className='text-3xl font-bold mb-6 text-center'>
            {staticText.SignUp}
          </h2>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
              <div key={field.name}>
                <Controller
                  name={field.name}
                  control={control}
                  rules={field.validation}
                  render={({ field: inputField }) => (
                    <FormField
                      {...inputField}
                      type={field.type}
                      id={inputField.name}
                      placeholder={field.placeholder}
                      errors={errors}
                    />
                  )}
                />
              </div>
            ))}

            <Button
              type='submit'
              disabled={isLoading}
              className='bg-subscriptionRed w-full md:text-lg font-medium rounded-full h-14'
            >
              {isLoading ? staticText.loading : staticText.SignUp}
            </Button>
          </form>

          <div className='flex mt-6 text-sm justify-center items-center'>
            <Typography variant='sm'>{staticText.existingUser}</Typography>
            <Button
              onClick={() => navigate(PUBLIC_ROUTES.SIGNIN)}
              variant='link'
              className='text-subscriptionRed font-medium hover:underline w-fit'
            >
              {staticText.signInNow}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
