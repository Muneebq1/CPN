import React from 'react';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { strings } from '@/locales';

import MobileHeader from './MobileHeader';

const MobileApp = () => {
  const handleButtonClick = () =>
    (window.location.href =
      'https://play.google.com/store/apps/details?id=com.cpnent.android');

  return (
    <div className='w-screen h-screen bg-grayBackground'>
      <div>
        <MobileHeader />
        <div className='absolute mt-20 inset-0 bg-gradient-to-b from-grayBackground/100 via-grayBackground/90 to-grayBackground/0 h-12 z-10' />
      </div>

      <div className='mt-24 relative w-full flex flex-col items-center justify-start'>
        <div className='h-[60vh] flex'>
          <div className='absolute bg-heroMobile bg-no-repeat bg-cover w-full h-[60vh] top-0 left-0' />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-grayBackground/10 to-grayBackground z-10' />
        </div>
        <div className='absolute z-50 text-center mt-[45vh] px-[6vh] space-y-[5vh] pb-10'>
          <div>
            <Typography className='font-semibold text-[26px]'>
              {strings.MobileApp.breakfastClub}
            </Typography>
            <Typography className='mt-2 text-xs md:text-xl'>
              {strings.MobileApp.breakfastDesc}
            </Typography>
          </div>
          <div>
            <Typography className='text-3xl font-semibold text-center'>
              {strings.MobileApp.watchOnAppOrWeb}
            </Typography>
          </div>
          <div>
            <Button
              className='bg-subscriptionRed text-white rounded-md py-8 font-normal text-base'
              onClick={handleButtonClick}
            >
              {strings.MobileApp.getFreeApp}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
