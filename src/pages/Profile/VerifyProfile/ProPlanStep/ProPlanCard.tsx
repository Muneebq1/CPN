import React from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import image3 from '@/assets/jpgs/verifyProfile3.png';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { features } from '@/constants/profile';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

const FeatureItem = ({ feature }: { feature: string }) => (
  <li className='flex items-center gap-2'>
    <IoCheckmarkOutline className='text-white w-6 h-6 flex-shrink-0' />
    <p className='leading-5'>{feature}</p>
  </li>
);
const ProPlanCard = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate(ROUTES.VERIFY_PROFILE);
  return (
    <div className='max-w-md mx-auto'>
      <div className='flex justify-start md:justify-center items-center mb-4'>
        <img src={image3} alt='proPlan' className='w-14' />
      </div>
      <div className='justify-start md:text-center mb-4'>
        <Typography className='text-base md:text-2xl font-medium'>
          {strings.Profile.proPlanHeader}
        </Typography>
        <Typography className='text-base md:text-xl font-medium'>
          {strings.Profile.proPlanCost}
        </Typography>
      </div>

      <ul className='space-y-3 text-xs md:text-lg  text-lightGray'>
        {features.map((feature, index) => (
          <FeatureItem key={`${index}-${feature}`} feature={feature} />
        ))}
      </ul>

      {/* Buttons */}
      <div className='flex justify-between mt-8 gap-2'>
        <Button
          onClick={handleCancel}
          className='bg-grayBackground md:bg-black text-sm md:text-xl font-medium rounded-full h-14'
        >
          {strings.cancel}
        </Button>
        <Button className='bg-subscriptionRed text-sm md:text-xl font-medium rounded-full h-14'>
          {strings.confirm}
        </Button>
      </div>
    </div>
  );
};

export default ProPlanCard;
