import React from 'react';
import { FiX } from 'react-icons/fi';
import { IoTvOutline } from 'react-icons/io5';
import { LuClock3 } from 'react-icons/lu';
import { TbLayoutBottombar } from 'react-icons/tb';

import { Typography } from '@/components/Typography';

interface SessionData {
  platform: string;
  browser: string;
  time: string;
  ip_address: string;
}

interface Props {
  item: SessionData;
  onDeleteSession: (item: SessionData) => void;
}

const SessionCard: React.FC<Props> = ({ item, onDeleteSession }) => {
  return (
    <div className='bg-grayBackground md:bg-black rounded-lg p-5'>
      <div className='flex justify-between'>
        <div className='bg-subscriptionRed rounded-full p-3 w-fit mb-2'>
          <IoTvOutline size={30} />
        </div>
        <FiX
          size={15}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={onDeleteSession as any}
          className='cursor-pointer'
        />
      </div>
      <Typography className='text-lg md:text-2xl font-bold leading-5'>
        {item.platform}
      </Typography>
      <div className='text-lightGray space-y-1'>
        <div className='flex items-center justify-start gap-2'>
          <LuClock3 color='#6C6C6C' size={20} />
          <Typography className='text-xs md:text-sm'>{item.browser}</Typography>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <TbLayoutBottombar color='#6C6C6C' size={20} />
          <Typography className='text-xs md:text-sm'>{item.time}</Typography>
        </div>
        <div className='flex items-center justify-start gap-2 ml-1'>
          <Typography className='text-xs md:text-sm'>IP Address:</Typography>
          <Typography className='text-xs md:text-sm'>
            {item.ip_address}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
