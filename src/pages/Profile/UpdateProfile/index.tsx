import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { strings } from '@/locales';
import {
  FeaturedCardValues,
  getUserFeaturedCards,
  updateUserProfile,
} from '@/redux/slices/userSlice';

import ProfileCard from './ProfileCard';
import SocialUpdateCard from './SocialUpdateCard';
import VideoCard from './VideoCard';

interface SocialLink {
  url: string;
  isVisible: boolean;
}

export interface IUserData {
  featuredCards: FeaturedCardValues[];
  profileTitle: string;
  bio: string;
  avatar: string;
  socialLinks?: Record<string, SocialLink>;
}

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const { userDetails, user } = useAppSelector((state) => state.auth);
  const { featuredCards } = useAppSelector((state) => state.user);

  const [userData, setUserData] = useState<IUserData>({
    featuredCards: [],
    profileTitle: '',
    bio: '',
    avatar: '',
  });

  useEffect(() => {
    dispatch(getUserFeaturedCards({}));
  }, [dispatch, user]);

  useEffect(() => {
    if (featuredCards.length < 3) {
      const demoCards: FeaturedCardValues[] = Array.from(
        { length: 3 - featuredCards.length },
        (_, index) => ({
          id: featuredCards.length + index + 1,
          title: '',
          link: '',
          image: '',
          sort: featuredCards.length + index + 1,
          enabled: 0,
          isNew: true,
        }),
      );
      setUserData((prev) => ({
        ...prev,
        featuredCards: [...featuredCards, ...demoCards],
      }));
    } else {
      setUserData((prev) => ({ ...prev, featuredCards }));
    }
  }, [featuredCards]);

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      profileTitle: userDetails?.title || '',
      bio: userDetails?.about || '',
      avatar: userDetails?.avatar || '',
      socialLinks: {
        instagram: {
          url: userDetails?.instagram || '',
          isVisible: userDetails?.is_instagram === '1',
        },
        facebook: {
          url: userDetails?.facebook || '',
          isVisible: userDetails?.is_facebook === '1',
        },
        twitter: {
          url: userDetails?.twitter || '',
          isVisible: userDetails?.is_twitter === '1',
        },
        tiktok: {
          url: userDetails?.tiktok || '',
          isVisible: userDetails?.is_tiktok === '1',
        },
        youtube: {
          url: userDetails?.youtube || '',
          isVisible: userDetails?.is_youtube === '1',
        },
      },
    }));
  }, [userDetails]);

  // const toggleModal = () => setIsVisible((prev) => !prev);

  // const handleOnDragEnd = ({ data }: { data: FeaturedCardValues[] }) => {
  //   setUserData((prev) => ({ ...prev, featuredCards: data }));
  // };

  const onSubmit = async () => {
    if (!userData.profileTitle) {
      toast.error('Profile title is required');
      return;
    }
    if (userData.bio.length > 100) {
      toast.error('Bio should not exceed 100 characters');
      return;
    }

    await dispatch(updateUserProfile(userData));
  };
  return (
    <div className=''>
      <Typography variant='title' className='mb-5 leading-10 font-semibold'>
        {strings.Profile.updateProfile}
      </Typography>

      <div className='flex flex-col md:flex-row gap-5'>
        <div className='w-full md:w-1/2 space-y-5'>
          <ProfileCard userData={userData} setUserData={setUserData} />
          <VideoCard />
          <VideoCard />
        </div>

        <div className='w-full md:w-1/2 space-y-5 flex flex-col'>
          <VideoCard />
          <div className='flex-auto'>
            <SocialUpdateCard userData={userData} setUserData={setUserData} />
          </div>
        </div>
      </div>

      <div className='flex justify-center mt-8'>
        <Button
          className='bg-subscriptionRed text-white rounded-full text-xl h-14 font-medium w-1/3'
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default UpdateProfile;
