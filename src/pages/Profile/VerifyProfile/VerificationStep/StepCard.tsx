import React from 'react';

import { StepProps } from '@/@types/profile';
import { Typography } from '@/components/Typography';

const StepCard: React.FC<StepProps> = ({
  heading,
  content,
  image,
  stepNumber,
  isLastStep,
}) => {
  return (
    <div>
      <div className='flex flex-row items-start gap-3 w-full'>
        <div className='flex-shrink-0 w-auto'>
          <Typography className='text-xs md:text-xl text-red-600'>
            {stepNumber}.
          </Typography>
        </div>
        <div className='flex flex-col'>
          <Typography className='text-sm md:text-2xl font-semibold leading-4'>
            {heading}
          </Typography>
          <Typography className='text-xs md:text-base text-grayText mb-3 xl:w-72'>
            {content}
          </Typography>
        </div>
        <div className='flex-shrink-0 ml-auto'>
          <img
            src={image}
            alt={`Step ${stepNumber}`}
            className='w-24 h-24 object-contain'
          />
        </div>
      </div>

      {!isLastStep && <div className='border-t border-gray-700 mt-4'></div>}
    </div>
  );
};

export default StepCard;
