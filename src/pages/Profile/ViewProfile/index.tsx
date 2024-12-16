import React, { useState } from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import {
  FaApple,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { HiOutlineX } from 'react-icons/hi';
import { TfiAndroid } from 'react-icons/tfi';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { strings } from '@/locales';

const ViewProfile = () => {
  const staticText = strings.Profile;
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo((prev) => !prev);
  };

  return (
    <div className=''>
      <Typography variant='title' className='mb-5 text-start font-semibold'>
        {staticText.viewProfile}
      </Typography>

      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col w-full p-0 md:p-12 max-w-2xl'>
          <div className='flex flex-col items-center'>
            <img
              src='https://via.placeholder.com/100'
              alt='Profile'
              className='w-24 h-24 md:w-32 md:h-32 rounded-full object-cover'
            />
            <h2 className='mt-4 flex justify-center items-center gap-2'>
              <Typography className='text-2xl md:text-3xl leading-10 font-semibold'>
                {staticText.cpnent}
              </Typography>
              <div>
                <BsPatchCheckFill size={20} color='#3897F0' />
              </div>
            </h2>
            <Typography variant='p' className='text-center mt-2 mx-0 md:mx-20'>
              {staticText.viewProfileDescription}
            </Typography>
          </div>

          <div className='mt-8 space-y-4'>
            {!showVideo && (
              <div
                className='flex items-center bg-grayBackground md:bg-black/70 p-4 rounded-xl cursor-pointer'
                onClick={toggleVideo}
              >
                <img
                  src='https://via.placeholder.com/40'
                  alt='Network'
                  className='w-10 h-10 rounded-full object-cover'
                />
                <Typography variant='p' className='ml-4 font-medium'>
                  {strings.AppName}
                </Typography>
              </div>
            )}

            {showVideo && (
              <div className='w-full flex flex-col items-center mt-4'>
                <iframe
                  width='100%'
                  height='315'
                  src='https://www.youtube.com/embed/_VQwAAowzbI'
                  title={strings.AppName}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='rounded-xl'
                ></iframe>
                <Button
                  onClick={toggleVideo}
                  icon={<HiOutlineX size={30} />}
                  size='icon'
                  className='mt-4 bg-black text-white h-14 p-4 rounded-full w-fit'
                />
              </div>
            )}

            <div className='flex items-center bg-grayBackground md:bg-black/70 p-4 rounded-xl'>
              <FaApple size={40} />
              <Typography variant='p' className='ml-4'>
                {staticText.availableAppStore}
              </Typography>
            </div>

            <div className='flex items-center bg-grayBackground md:bg-black/70 p-4 rounded-xl'>
              <TfiAndroid size={40} />
              <Typography variant='p' className='ml-4'>
                {staticText.availableGooglePlay}
              </Typography>
            </div>
          </div>
        </div>

        <div className='mt-10 flex gap-8 text-gray-400 text-xl justify-center md:hidden'>
          <FaInstagram size={30} />
          <FaFacebook size={30} />
          <FaXTwitter size={30} />
          <FaTiktok size={30} />
          <FaYoutube size={30} />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
