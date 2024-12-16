import React, { useState } from 'react';

import { CardProps } from '@/@types';
import { cn } from '@/lib/utils';

import CardContent from './CardContent';

const SkeletonLoader: React.FC<{
  height: string;
  isPodcast: boolean | undefined;
}> = ({ height, isPodcast }) => (
  <div className='h-fit'>
    <div className={`animate-pulse bg-gray-700 rounded-lg ${height} w-full`} />
    <div className={'animate-pulse bg-gray-700 rounded-lg h-6 mt-2 w-1/2'} />
    {!isPodcast && (
      <div className={'animate-pulse bg-gray-700 rounded-lg h-7 mt-2 w-full'} />
    )}
    {!isPodcast && (
      <div className={'animate-pulse bg-gray-700 rounded-xl h-7 mt-2 w-full'} />
    )}
  </div>
);

const Card: React.FC<CardProps> = ({
  image,
  title,
  profile,
  subscription,
  allData,
  isCarousel,
  name,
  description,
  isLiked,
  categoryId,
  id,
  url,
  isPodcast,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const imageHeight = isCarousel
    ? 'h-48'
    : subscription
      ? 'md:h-72 h-40 cursor-pointer'
      : 'md:h-44 h-24';
  const imageClasses = cn(
    'w-full rounded-lg ',
    imageHeight,
    !isLoading && 'visible',
    isLoading && 'invisible',
  );

  const containerClasses = cn(
    'md:min-w-72 min-w-40 w-40 md:w-72 text-white rounded-lg shadow-lg',
    {
      'min-w-[90%] w-[99%] md:w-full': allData,
      'h-64 w-44 md:w-44 min-w-44 md:min-w-44': isCarousel,
      'cursor-pointer': isPodcast,
    },
  );

  return (
    <div className={containerClasses}>
      {isLoading && (
        <SkeletonLoader height={imageHeight} isPodcast={isPodcast} />
      )}
      <img
        onClick={() => {
          if (subscription) {
            window.location.href = `/video-player?playlist=${url?.split('/').pop()}`;
          }
          if (isPodcast) {
            window.location.href = `/podcast-video-player?playlist=${url?.split('/').pop()}`;
          }
        }}
        src={image}
        alt='Card Image'
        className={` ${isLoading ? 'hidden' : ''} ${imageClasses}`}
        onLoad={() => setIsLoading(false)}
      />
      {!isLoading && (
        <CardContent
          isCarousel={isCarousel}
          title={title}
          profile={profile}
          subscription={subscription}
          name={name}
          description={description}
          isLiked={isLiked}
          categoryId={categoryId}
          id={id}
          url={url}
        />
      )}
    </div>
  );
};

export default Card;
