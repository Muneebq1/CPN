import React from 'react';

import { Typography } from '@/components/Typography';
import { strings } from '@/locales';

import ProPlanCard from './ProPlanCard';

const ProPlanStep = () => {
  return (
    <div className='p-5 md:pt-0'>
      {/* Title Section */}
      <Typography variant='title' className='mb-5 leading-10 font-semibold'>
        {strings.Profile.verifyProfile}
      </Typography>

      <div className='flex flex-col gap-8 md:mx-10 xl:mx-52 my-10'>
        <ProPlanCard />
      </div>
    </div>
  );
};

export default ProPlanStep;
