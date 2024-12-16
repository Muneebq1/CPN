import { CardProps } from '@/@types';
import BookmarkIcon from '@/assets/svgs/BookmarkIcon';
import VerifiedIcon from '@/assets/svgs/VerifiedIcon';

import { Typography } from '../Typography';

const ProfileCard: React.FC<{
  profile: CardProps['profile'];
  title: string;
  handleSavePost: () => void;
  isPostSaved: boolean;
}> = ({ profile, title, handleSavePost, isPostSaved }) => (
  <div>
    <p className='font-medium text-sm md:text-lg md:leading-5 mt-0.5'>
      {title}
    </p>
    <div className='flex items-center justify-between py-2 rounded-b-lg'>
      <div className='flex items-center space-x-2 w-full'>
        <img
          src='https://via.placeholder.com/40'
          alt={profile?.name}
          className='w-8 h-8 rounded-full'
        />
        <div className='flex justify-between items-center w-full'>
          <Typography>
            <span className='font-semibold text-sm flex items-center gap-1'>
              {profile?.name} <VerifiedIcon height={15} width={15} />
            </span>
            <div className='text-xs text-gray-500'>
              <span>{profile?.time}</span> | <span>{profile?.platform}</span>
            </div>
          </Typography>
          <BookmarkIcon
            fill={isPostSaved ? 'red' : ''}
            className='cursor-pointer'
            onClick={handleSavePost}
          />
        </div>
      </div>
    </div>
  </div>
);
export default ProfileCard;
