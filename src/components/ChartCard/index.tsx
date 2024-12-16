import React, { useState } from 'react';

import { chartCardProp } from '@/@types';

import { Typography } from '../Typography';
import { Button } from '../ui/button';

const SkeletonLoader: React.FC<{
  width: string;
  height: string;
  rounded?: string;
}> = ({ width, height, rounded = 'rounded-lg' }) => (
  <div className={`animate-pulse bg-gray-700 ${rounded} ${width} ${height}`} />
);
const ChartCard: React.FC<chartCardProp> = ({
  image,
  index,
  description,
  name,
  url,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleToggle = () => setIsExpanded((prev) => !prev);
  const displayText = isExpanded
    ? description
    : `${description?.slice(0, 70)}...`;

  if (description) {
    return (
      <div className='lg:min-w-96 min-w-40 flex gap-2 items-center jus text-white rounded-lg mt-5'>
        <img
          src={image}
          alt='Card Image'
          className={`w-44 h-32 lg:h-44 rounded-t-lg ${isLoading ? 'hidden' : ''} `}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && <SkeletonLoader width='w-44' height='h-32 lg:h-44 ' />}

        <div className='flex flex-col h-32 lg:h-44 justify-between'>
          <div>
            {!isLoading ? (
              <p className='font-medium text-sm lg:text-lg md:w-40 lg:w-48 leading-5 mt-1.5'>
                {name}
              </p>
            ) : (
              <SkeletonLoader width='w-44' height='md:w-40 lg:w-48 h-5' />
            )}
            {!isLoading ? (
              <p className='text-gray-400 text-[10px] lg:text-sm md:w-40 lg:w-48 leading-4 mt-1'>
                {displayText}{' '}
                {description && description?.length > 50 && (
                  <button
                    className='text-blue-500 font-medium hover:underline'
                    onClick={handleToggle}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </p>
            ) : (
              <SkeletonLoader width='w-44' height='md:w-40 lg:w-48 h-16 mt-2' />
            )}
          </div>
          {!isLoading ? (
            <Button
              onClick={() => {
                window.location.href = `/video-player?playlist=${url?.split('/').pop()}`;
              }}
              variant='default'
              className='bg-subscriptionRed text-white mt-2 w-fit rounded-3xl font-medium'
            >
              Watch Now
            </Button>
          ) : (
            <SkeletonLoader width='w-24' height=' h-12 mt-2' />
          )}
        </div>
        <Typography className='number-gradient-small mt-20'>
          {index + 1}
        </Typography>
      </div>
    );
  }
  return (
    <div
      onClick={() => {
        window.location.href = `/video-player?playlist=${url?.split('/').pop()}`;
      }}
      className='md:min-w-96 cursor-pointer min-w-56 flex gap-3 items-center text-white rounded-lg shadow-lg'
    >
      <Typography className='number-gradient '>{index + 1}</Typography>
      <img
        src={image}
        alt='Card Image'
        className={'w-52 h-32 md:h-48 rounded-t-lg mt-1 obj'}
      />
    </div>
  );
};

export default ChartCard;
