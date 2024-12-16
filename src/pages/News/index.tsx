import React from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import { useAppSelector } from '@/hooks/redux';

const News = () => {
  const { channels } = useAppSelector((state) => {
    return {
      channels: state?.channels.channels,
    };
  });
  return (
    <Container className='bg-transparent !pt-14 backgroundGradient'>
      <CardSection
        title='News'
        data={channels[4]}
        allData
        subscription
        id={4}
      />
    </Container>
  );
};

export default News;
