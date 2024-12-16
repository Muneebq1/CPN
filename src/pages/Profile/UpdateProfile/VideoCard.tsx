import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { IoImageOutline } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';

import ToggleSwitch from '@/components/ToggleSwitch';
import { Typography } from '@/components/Typography';
import { strings } from '@/locales';

const VideoCard = () => {
  const youtubeLink = 'https://www.youtube.com/embed/_VQwAAowzb';

  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <div className='flex h-fit p-6 bg-grayBackground md:bg-black rounded-lg'>
      <div className='flex flex-col space-y-2 w-3/4'>
        <div className='flex gap-2 w-fit px-1 items-center bg-black md:bg-transparent'>
          <IoImageOutline size={15} />
          <Typography className='text-sm leading-4'>
            {strings.addImage}
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          <Typography variant='lg' className='font-medium leading-6'>
            {strings.AppName}
          </Typography>
          <div>
            <FiEdit2 color='white' size={15} />
          </div>
        </div>
        <div className='text-lightGray truncate md:w-[235px] flex items-center gap-2'>
          <a href={youtubeLink} className='truncate hover:underline'>
            {youtubeLink}
          </a>
          <div>
            <FiEdit2 color='white' size={15} />
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-end w-1/4 space-y-3'>
        <ToggleSwitch checked={isToggled} onChange={handleToggleChange} />
        <RiDeleteBinLine color='white' size={20} />
      </div>
    </div>
  );
};

export default VideoCard;
