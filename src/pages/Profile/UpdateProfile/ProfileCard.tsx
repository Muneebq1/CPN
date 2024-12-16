import React, { useState } from 'react';

import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { strings } from '@/locales';
import { openGallery } from '@/utils/media';

import { IUserData } from '.';

export interface UpdateProfileHeaderProps {
  userData?: IUserData;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}

const ProfileCard: React.FC<UpdateProfileHeaderProps> = ({
  userData,
  setUserData,
}) => {
  const [image, setImage] = useState<string | null>(userData?.avatar || null);

  const handleImagePick = async () => {
    const response = await openGallery();
    if (response) {
      setImage(response);
      handleOnchange('avatar', response);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    handleOnchange('avatar', '');
  };

  const handleOnchange = (name: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='p-6 bg-grayBackground md:bg-black rounded-lg flex flex-col items-center space-y-6'>
      <div className='flex items-center w-full gap-2'>
        <img
          src={
            image ||
            'https://cpnpodcast.com/upload/photos/d-avatar.webp?cache=0'
          }
          alt='Profile'
          className='w-28 h-28 rounded-full object-cover'
        />
        <div className='flex flex-col items-center gap-2 w-full'>
          <Button
            onClick={handleImagePick}
            className='w-full bg-subscriptionRed font-medium rounded-full'
          >
            {strings.Profile.pickImage}
          </Button>

          <Button
            onClick={handleDeleteImage}
            className='w-full bg-black md:bg-grayBackground font-medium rounded-full'
          >
            {strings.delete}
          </Button>
        </div>
      </div>

      <div className='w-full'>
        <Typography variant='lg' className='font-normal'>
          {strings.Profile.profileTitle}
        </Typography>
        <Input
          type='text'
          placeholder='Enter your title'
          value={userData?.profileTitle}
          onChange={(e) => handleOnchange('profileTitle', e.target.value)}
          className='w-full py-2 px-4 border-none bg-black md:bg-grayBackground text-white rounded-md mb-2'
        />
        <Typography variant='lg' className='font-normal'>
          {strings.Profile.bio}
        </Typography>
        <Textarea
          name='bio'
          placeholder='You’re one step closer to being part of the coolest podcast network.'
          value={userData?.bio}
          onChange={(e) => handleOnchange('bio', e.target.value)}
          className='w-full py-2 px-4 border-none bg-black md:bg-grayBackground text-white rounded-md'
        />
      </div>
    </div>
  );
};

export default ProfileCard;
