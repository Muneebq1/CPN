import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Comedy = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });

  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='Comedy'
        data={channels[2]}
        allData
        subscription
        id={2}
      />
    </Container>
  );
};

export default Comedy;
