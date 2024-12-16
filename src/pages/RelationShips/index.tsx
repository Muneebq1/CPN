import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Relationships = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });
  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='Relationships'
        data={channels[8]}
        allData
        subscription
        id={8}
      />
    </Container>
  );
};

export default Relationships;
