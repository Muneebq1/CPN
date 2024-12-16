import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const Leisure = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });

  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='Leisure'
        data={channels[10]}
        allData
        subscription
        id={10}
      />
    </Container>
  );
};

export default Leisure;
