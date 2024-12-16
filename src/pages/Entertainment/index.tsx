import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Entertainment = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });
  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='Entertainment'
        data={channels[5]}
        allData
        subscription
        id={5}
      />
    </Container>
  );
};

export default Entertainment;
