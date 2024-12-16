import React from 'react';
import { useNavigate } from 'react-router-dom';

import { appStoreLinks, footerLinks } from '@/constants';
import { strings } from '@/locales';

import { Button } from './ui/button';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className='bg-footerGradient text-white py-6'>
      <div className='flex flex-wrap gap-4 sm:gap-6 md:gap-9 justify-center text-sm text-[22px]  my-6 mx-10'>
        {footerLinks.map(({ label, route }) => (
          <Button
            key={label}
            onClick={() => navigate(route)}
            className='hover:underline text-center sm:text-left w-fit text-sm text-[22px] font-normal'
          >
            {label}
          </Button>
        ))}
      </div>
      <div className='flex justify-center space-x-2 sm:space-x-4 my-8'>
        {appStoreLinks.map(({ route, imgSrc, alt }) => (
          <Button
            key={alt}
            onClick={() => navigate(route)}
            className='flex-shrink-0 w-fit'
          >
            <img src={imgSrc} alt={alt} className='h-8 sm:h-10 lg:h-12' />
          </Button>
        ))}
      </div>
      <div className='text-center my-6 text-sm text-[22px] font-normal lg:text-lg px-4'>
        {strings.Footer.footerContent}
      </div>
    </footer>
  );
};

export default Footer;
