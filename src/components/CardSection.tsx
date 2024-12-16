/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { CardSectionProps } from '@/@types';
import Card from '@/components/Card';
import { Typography } from '@/components/Typography';
import { useAppDispatch } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { fetchChannels } from '@/redux/slices/channelSlice';
// import { fetchPodcasts } from '@/redux/slices/postsSlice';
import { ROUTES } from '@/routes';

import Loader from './Loader';

const CardSection: React.FC<any & { isCarousel?: boolean }> = ({
  title,
  data,
  viewAllRoute,
  isCarousel = false,
  allData,
  subscription = false,
  isDashboard = false,
  id = 0,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const visibleCards = 8;

  const handleRouteChange = () => {
    const routeToNavigate = isMobile ? ROUTES.MOBILE_APP : viewAllRoute;
    if (routeToNavigate) {
      // window.location.href = routeToNavigate;
      navigate(routeToNavigate);
    }
  };
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < data.length - visibleCards ? prevIndex + 1 : 0,
    );
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - visibleCards,
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    if (!isDashboard && !data?.length && id) {
      // dispatch(fetchChannels({ type: 'top' }));
      // dispatch(fetchPodcasts({ type: 'highlighted' }));
      dispatch(fetchChannels({ id: id }));
    } else {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return !isLoading ? (
    <div className='my-5 md:my-10'>
      <div className='flex justify-between w-full pr-4'>
        <Typography
          className={cn('font-semibold text-offWhite mb-1 text', {
            'mb-2 text-xl md:!text-3xl': allData,
            'text-xl md:!text-3xl': !allData,
          })}
          variant='title'
        >
          {title}
        </Typography>
        {viewAllRoute ? (
          <div className='cursor-pointer' onClick={handleRouteChange}>
            <Typography>{strings.viewAll}</Typography>
          </div>
        ) : null}
      </div>

      {isCarousel ? (
        <div className='relative w-full'>
          {data?.length ? (
            <div className='flex w-[95%] mx-auto overflow-hidden'>
              <div
                className='flex gap-2 transition-transform duration-300'
                style={{
                  transform: `translateX(-${currentIndex * (60 / visibleCards)}%)`,
                }}
              >
                {data.map((card: any, idx: number) => (
                  <Card
                    key={`carousel-card-${idx}`}
                    isCarousel
                    image={card.image}
                    title={card.title}
                    profile={card?.profile}
                    subscription={subscription}
                    name={card.name}
                    description={card.description}
                    isLiked={card.is_liked}
                    categoryId={card.category_id}
                    id={card.id}
                    url={card?.url}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className='text-center'>No playlist added yet</div>
          )}

          {data?.length > 7 && (
            <button
              className='absolute top-1/2 left-3 transform -translate-y-1/2 z-10 text-white text-2xl font-thin rounded-full shadow-md'
              onClick={prevSlide}
            >
              ❮
            </button>
          )}
          {data?.length > 7 && (
            <button
              className='absolute top-1/2 right-3 transform -translate-y-1/2 z-10 text-white text-2xl font-thin rounded-full shadow-md'
              onClick={nextSlide}
            >
              ❯
            </button>
          )}
        </div>
      ) : data?.length ? (
        <div
          className={cn(' mt-5 w-full', {
            'grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-3 overflow-x-hidden gap-2 md:gap-5':
              allData,
            'flex overflow-auto gap-2': !allData,
          })}
        >
          {data.map((card: any, idx: number) => (
            <Card
              key={`card-${idx}`}
              image={card.image}
              title={card.title}
              profile={card?.profile}
              subscription={subscription}
              allData={allData}
              name={card.name}
              description={card.description}
              isLiked={card.is_liked}
              categoryId={card.category_id}
              id={card.id}
              url={card?.url}
              isPodcast={title === 'Highlighted Podcasts'}
            />
          ))}
        </div>
      ) : (
        <div className='text-center'>No playlist added yet</div>
      )}
    </div>
  ) : (
    <div className='flex h-screen items-center justify-center'>
      <Loader />
    </div>
  );
};

export default CardSection;
