import React, { useEffect, useState } from 'react';

import HeroCarousel from '@/components/Carousel';
import ChartCard from '@/components/ChartCard';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { profileCardData } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchChannels } from '@/redux/slices/channelSlice';
import { fetchPodcasts } from '@/redux/slices/postsSlice';
import { ROUTES } from '@/routes';

import CardSection from '../../components/CardSection';

import HeroSection from './HeroSection';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { podcasts, channels } = useAppSelector((state) => {
    return {
      podcasts: state?.posts?.podcasts,
      channels: state?.channels.channels,
    };
  });

  useEffect(() => {
    if (!podcasts?.length) {
      [...Array(5)].map((_, idx) => dispatch(fetchChannels({ id: idx + 1 })));
      dispatch(fetchChannels({ type: 'top' }));
      dispatch(fetchPodcasts({ type: 'highlighted' }));
    } else {
      setIsLoading(false);
    }
  }, [channels[1]]);

  return isLoading ? (
    <div className='h-screen flex justify-center items-center'>
      <Loader />
    </div>
  ) : (
    <div className='relative'>
      <HeroCarousel />
      <div className='w-full h-full'>
        <div className='absolute top-0 z-20'>
          <HeroSection />{' '}
          <div className='w-screen overflow-auto pl-1'>
            <CardSection
              title='Community Episodes'
              isDashboard
              data={profileCardData}
            />
          </div>
        </div>
        <Container className=' bg-transparent '>
          <div className='mt-36 md:mt-10 lg:mt-20 xl:mt-14'>
            <Typography className={'text-xl md:!text-3xl'}>
              Top 10 in Charts
            </Typography>
            <div className='flex gap-2 items-center overflow-y-hidden overflow-x-auto'>
              {channels?.top
                ?.slice(0, 10)
                .map((topChart, idx) => (
                  <ChartCard
                    key={`chart-card-${idx}`}
                    image={topChart.image}
                    index={idx}
                    url={topChart.url}
                  />
                ))}
            </div>
          </div>
          {[...Array(3)].map((_, idx) => (
            <CardSection
              key={`card-${idx}`}
              title='Highlighted Podcasts'
              data={podcasts}
              isDashboard
            />
          ))}
          {channels[1] && (
            <CardSection
              viewAllRoute={ROUTES.BUSINESS}
              title='Business'
              data={channels[1]}
              subscription
              isDashboard
            />
          )}
          {channels[2] && (
            <CardSection
              viewAllRoute={ROUTES.COMEDY}
              title='Comedy'
              data={channels[2]}
              subscription
              isDashboard
            />
          )}{' '}
          {channels[3] && (
            <CardSection
              viewAllRoute={ROUTES.SPORTS}
              title='Sports'
              data={channels[3]}
              subscription
              isDashboard
            />
          )}
          {channels[4] && (
            <CardSection
              viewAllRoute={ROUTES.SPORTS}
              title='News'
              data={channels[4]}
              subscription
              isDashboard
            />
          )}
          {channels[5] && (
            <CardSection
              viewAllRoute={ROUTES.ENTERTAINMENT}
              title='Entertainment'
              data={channels[5]}
              subscription
              isDashboard
            />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
