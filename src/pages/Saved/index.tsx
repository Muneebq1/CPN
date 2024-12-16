import React, { useEffect, useState } from 'react';

import CardSection from '@/components/CardSection';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchLikedChannels } from '@/redux/slices/channelSlice';
import { fetchSavedPosts } from '@/redux/slices/postsSlice';

const Saved = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { likedChannels, savedPosts } = useAppSelector((state) => {
    return {
      likedChannels: state?.channels.likedChannels,
      savedPosts: state.posts.savedPosts,
    };
  });

  const getPosts = async () => {
    await dispatch(fetchSavedPosts({ type: 'saved', id: '2' }));
    await dispatch(fetchLikedChannels({ type: 'liked' }));
    setIsLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Container className='bg-transparent my-10 min-h-[56vh] backgroundGradient'>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      ) : (
        <div>
          <CardSection
            isCarousel
            title='Favorites'
            data={likedChannels}
            subscription
            isDashboard
          />
          <CardSection
            title='Saved Episodes'
            data={savedPosts}
            allData
            isDashboard
          />
        </div>
      )}
    </Container>
  );
};

export default Saved;
