import React from 'react';
import { useNavigate } from 'react-router-dom';

import { appStoreLinks } from '@/constants';
import { strings } from '@/locales';

import { Button } from '../ui/button';

const SidebarFooter = () => {
  const navigate = useNavigate();

  return (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <div className='text-sm mr-12'>{strings.Footer.downloadMobileApp}</div>
        <div className='flex gap-2'>
          {appStoreLinks.map(({ route, imgSrc, alt }) => (
            <Button
              key={alt}
              onClick={() => navigate(route)}
              className='p-0 bg-transparent shadow-none'
            >
              <img src={imgSrc} alt={alt} className='h-9' />
            </Button>
          ))}
        </div>
      </div>

      <div className='flex justify-center text-sm pt-12'>
        {strings.Footer.footerContent}
      </div>
    </div>
  );
};

export default SidebarFooter;
