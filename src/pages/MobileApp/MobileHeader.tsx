import React from 'react';
import { FiX } from 'react-icons/fi';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import mobileLogo from '@/assets/logo2.png';
import { Typography } from '@/components/Typography';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

const MobileHeader = () => {
  const navigate = useNavigate();
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-grayBackground p-5 flex items-center justify-between gap-2'>
      <FiX
        size={20}
        color='white'
        className='flex-shrink-0'
        onClick={() => navigate(ROUTES.DASHBOARD)}
      />
      <img
        src={mobileLogo}
        className='bg-grayBackground rounded-xl p-3 flex-shrink-0'
        alt='Mobile App Logo'
      />
      <div className='flex-grow'>
        <Typography variant='sm' className='text-white'>
          {strings.MobileApp.coolPeopleNetwork}
        </Typography>
        <Typography variant='sm' className='text-darkGrayText'>
          {strings.MobileApp.startWatching}
        </Typography>
      </div>
      <IoCloudDownloadOutline size={25} color='#0087FF' className='mr-8' />
    </div>
  );
};

export default MobileHeader;
