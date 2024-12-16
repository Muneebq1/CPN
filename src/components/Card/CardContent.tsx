/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';

import { CardProps } from '@/@types';
import BookmarkIcon from '@/assets/svgs/BookmarkIcon';
import { useAppDispatch } from '@/hooks/redux';
import { postAction } from '@/redux/slices/postsSlice';

import { Typography } from '../Typography';

import ProfileCard from './ProfileCard';
import SubscriptionCard from './SubscriptionCard';

const DefaultCard: React.FC<{
  title: string;
  handleSavePost: () => void;
  isPostSaved: boolean;
}> = ({ title, handleSavePost, isPostSaved }) => (
  <div className='flex justify-between items-center w-full md:mt-2'>
    <Typography className='font-semibold text-[10px] md:text-lg leading-5'>
      {title}
    </Typography>
    <BookmarkIcon
      fill={isPostSaved ? 'red' : ''}
      className='cursor-pointer'
      onClick={handleSavePost}
    />
  </div>
);

const CardContent: React.FC<CardProps> = ({
  title,
  profile,
  subscription,
  isCarousel,
  name,
  description,
  isLiked,
  categoryId,
  id,
}) => {
  const dispatch = useAppDispatch();

  const [isPostSaved, setIsPostSaved] = useState(false);
  const handleSavePost = () => {
    setIsPostSaved(!isPostSaved);
    if (id) {
      dispatch(
        postAction({
          post_id: id?.toString(),
          action: 'save',
        }),
      );
      // if (isPostSaved) {
      //   dispatch(removeSavedPost(id?.toString()));
      // }
    }
  };

  if (profile) {
    return (
      <ProfileCard
        profile={profile}
        title={title}
        handleSavePost={handleSavePost}
        isPostSaved={isPostSaved}
      />
    );
  } else if (subscription) {
    return (
      <SubscriptionCard
        isCarousel={isCarousel}
        name={name}
        isLiked={isLiked}
        description={description}
        categoryID={categoryId}
        id={id}
      />
    );
  }
  return (
    <DefaultCard
      title={title}
      handleSavePost={handleSavePost}
      isPostSaved={isPostSaved}
    />
  );
};

export default CardContent;
