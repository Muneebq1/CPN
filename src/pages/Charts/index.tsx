import React, { useEffect, useState } from 'react';

import ChartCard from '@/components/ChartCard';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import { Typography } from '@/components/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { fetchChannels } from '@/redux/slices/channelSlice';

const Charts = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });
  useEffect(() => {
    if (!channels?.top?.length) {
      dispatch(fetchChannels({ type: 'top' }));
    } else {
      setIsLoading(false);
    }
  }, [channels.top]);

  return (
    <Container
      className={cn('bg-transparent !pt-14 backgroundGradient', {
        '': !isLoading,
      })}
    >
      <div className='my-10'>
        <Typography className={cn('font-semibold mb-2')} variant='title'>
          Top Charts
        </Typography>
        {isLoading ? (
          <div className='flex justify-center h-screen items-center'>
            <Loader />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-cente w-fit xl:w-full mx-auto xl:mx-3'>
            {channels?.top?.map((topChart, idx) => (
              <ChartCard
                description={topChart?.description}
                name={topChart?.name}
                key={`chart-card-${idx}`}
                image={topChart.image}
                index={idx}
                url={topChart.url}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Charts;
