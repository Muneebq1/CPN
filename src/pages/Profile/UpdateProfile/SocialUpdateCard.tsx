import React from 'react';

import ToggleSwitch from '@/components/ToggleSwitch';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/ui/input';
import { socialLinks } from '@/constants/profile';
import { strings } from '@/locales';

import { IUserData } from '.';

interface Props {
  userData: IUserData;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
}

const SocialUpdateCard: React.FC<Props> = ({ userData, setUserData }) => {
  const handleToggle = (platform: keyof typeof userData.socialLinks) => {
    setUserData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: {
          ...prev.socialLinks?.[platform],
          isVisible: !prev.socialLinks?.[platform]?.isVisible,
        },
      },
    }));
  };

  const handleChange = (
    platform: keyof typeof userData.socialLinks,
    value: string,
  ) => {
    setUserData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: {
          ...prev.socialLinks?.[platform],
          url: value,
        },
      },
    }));
  };

  return (
    <div className='flex flex-col h-full p-5 bg-black shadow-lg rounded-lg'>
      <Typography variant='heading'>
        {strings.Profile.editSocialLinks}
      </Typography>

      <div className='flex flex-col gap-10 my-5'>
        {socialLinks.map(({ id, icon: Icon }) => (
          <div key={id} className='flex justify-center items-center'>
            <Icon size={40} color='#6C6C6C' />
            <div className='ml-4 flex-1'>
              <Input
                type='url'
                placeholder='Enter URL'
                className='w-full px-5 border-none bg-grayBackground text-white rounded-full'
                value={userData.socialLinks?.[id]?.url || ''}
                onChange={(e) =>
                  handleChange(
                    id as keyof typeof userData.socialLinks,
                    e.target.value,
                  )
                }
              />
            </div>
            <ToggleSwitch
              checked={userData.socialLinks?.[id]?.isVisible || false}
              onChange={() =>
                handleToggle(id as keyof typeof userData.socialLinks)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialUpdateCard;
