import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Sports = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });
  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='Sports'
        data={channels[3]}
        allData
        subscription
        id={3}
      />
    </Container>
  );
};

export default Sports;
