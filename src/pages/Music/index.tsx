import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Music = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });
  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='Music'
        data={channels[6]}
        allData
        subscription
        id={6}
      />
    </Container>
  );
};

export default Music;
