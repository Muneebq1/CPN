import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { stepsData } from '@/constants/profile';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

import StepCard from './StepCard';

const VerifyProfile = () => {
  const navigate = useNavigate();
  const handleProceed = () => navigate(ROUTES.PRO_PLAN);
  return (
    <div className='p-5 md:pt-0'>
      <Typography variant='title' className='mb-5 leading-10 font-semibold'>
        {strings.Profile.verifyProfile}
      </Typography>

      <div className='flex flex-col gap-8 md:mx-10 xl:mx-52 my-10'>
        {stepsData.map((step, index) => (
          <StepCard
            key={`${index}-${step.heading}`}
            stepNumber={index + 1}
            heading={step.heading}
            content={step.content}
            image={step.image}
            isLastStep={index === stepsData.length - 1}
          />
        ))}

        <div className='flex justify-center mt-6'>
          <Button
            onClick={handleProceed}
            className='bg-subscriptionRed rounded-full text-sm md:text-xl font-medium h-14 py-4'
          >
            {strings.Profile.proceedForVerification}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyProfile;
