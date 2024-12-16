import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Business = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });

  console.log('check');

  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        subscription
        title='Business'
        data={channels[1]}
        allData
        id={1}
      />
    </Container>
  );
};

export default Business;
