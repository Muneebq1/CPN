import { useState } from 'react';

import { useAppDispatch } from '@/hooks/redux';
import { strings } from '@/locales';
import { likeChannel } from '@/redux/slices/channelSlice';

import { Typography } from '../Typography';
import { Button } from '../ui/button';

const SubscriptionCard: React.FC<{
  isCarousel?: boolean;
  name?: string;
  description?: string;
  isLiked?: boolean;
  id?: number;
  categoryID?: number;
}> = ({ isCarousel, name, description, isLiked, id, categoryID }) => {
  const dispatch = useAppDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(isLiked);
  const handleToggle = () => setIsExpanded((prev) => !prev);

  const handleSubscribe = async () => {
    if (categoryID && id) {
      await dispatch(
        likeChannel({
          channel_id: id,
          type: isLiked ? 'dislike' : 'like',
          categoryID,
        }),
      );
      setIsSubscribe(!isSubscribe);
      // window.location.href = '/saved';
    }

    // setIsSubscribe((prev) => !prev);
  };

  const displayText = isExpanded
    ? description
    : `${description?.slice(0, 60)}...`;

  return (
    <div className='cursor-pointer'>
      {!isCarousel && (
        <Typography className='font-bold truncate text-xs md:text-lg'>
          {name}
        </Typography>
      )}
      {!isCarousel ? (
        <p className='text-gray-400 text-[10px] md:text-sm leading-3 md:leading-4 mt-1'>
          {displayText}{' '}
          {description && description?.length > 60 && (
            <button
              className='text-blue-500 font-medium hover:underline'
              onClick={handleToggle}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </p>
      ) : (
        <Typography variant='xs' className='truncate mt-1'>
          {strings.CardContent.desc}
        </Typography>
      )}
      <Button
        onClick={handleSubscribe}
        variant='default'
        size={'sm'}
        className='bg-subscriptionRed rounded-3xl text-white mt-2 w-full h-8 font-medium'
      >
        {isSubscribe ? strings?.unSubscribe : strings.subscribe}
      </Button>
    </div>
  );
};

export default SubscriptionCard;
