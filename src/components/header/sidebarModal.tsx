import React, { useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { UserModalProps } from '@/@types';
import logo from '@/assets/logo.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { fetchUserDetails } from '@/redux/slices/auth';
import { ROUTES } from '@/routes';

import { Button } from '../ui/button';

import SettingsItemsList from './settingsItemsList';
import SidebarFooter from './sidebarFooter';

const UserProfile = ({
  onNavigate,
  name,
  avatar,
}: {
  onNavigate: (route: string) => void;
  name: string;
  avatar?: string;
}) => (
  <div className='flex items-center space-x-4 pb-4'>
    <div className='w-12 h-12 rounded-full flex-shrink-0'>
      <img
        src={avatar || 'https://via.placeholder.com/48'}
        alt='User Avatar'
        className='rounded-full w-full h-full object-cover'
      />
    </div>
    <div className='text-white'>
      <h3 className='font-medium text-xl'>{name}</h3>
      <Button
        onClick={() => onNavigate(ROUTES.VIEW_PROFILE)}
        icon={<FaAngleRight />}
        className='text-lightGray font-normal text-base px-0 h-0'
        textWithIconClassName='flex justify-start'
      >
        {strings.Profile.viewProfile}
      </Button>
    </div>
  </div>
);

const SidebarModal: React.FC<UserModalProps> = ({
  settingsItems,
  setToggleSidebar,
  showUserProfile = true,
  showLogo = false,
  showButtonIcons = true,
  className,
  isProfile = false,
  setIsModalOpen,
}) => {
  const dispatch = useAppDispatch();

  const { userDetails, user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (user?.userId) {
      dispatch(
        fetchUserDetails({
          data: {
            user_id: user?.userId as string,
            fetch: 'user_data',
          },
        }),
      );
    }
  }, [user]);

  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
    if (setToggleSidebar) {
      setToggleSidebar();
    }
  };

  return (
    <div
      className={cn(
        'focus:outline-none bg-black flex flex-col justify-between p-5 w-80 rounded-3xl shadow-lg',
        className,
      )}
    >
      {showLogo && (
        <p className='flex justify-between items-center my-4 '>
          <img
            onClick={() => navigate(ROUTES.DASHBOARD)}
            src={logo}
            alt={strings.Header.logo}
            className='w-28 xl:w-40'
          />
          <FiX onClick={setToggleSidebar} size={20} />
        </p>
      )}
      <div className='flex-grow'>
        {showUserProfile && (
          <UserProfile
            onNavigate={handleNavigation}
            name={userDetails?.username || ''}
            avatar={
              'https://cpnpodcast.com/upload/photos/d-avatar.webp?cache=0'
            }
          />
        )}
        <div className='mt-4 text-white'>
          {!isProfile && showUserProfile && (
            <h4 className='font-medium text-xl uppercase tracking-wide mb-2'>
              {strings.Profile.settings}
            </h4>
          )}
          <SettingsItemsList
            items={settingsItems}
            onNavigate={handleNavigation}
            showButtonIcons={showButtonIcons}
            showLogo={showLogo}
          />
        </div>
      </div>
      {showLogo && <SidebarFooter />}
    </div>
  );
};

export default SidebarModal;
