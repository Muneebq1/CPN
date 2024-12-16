import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SidebarModal from '@/components/header/sidebarModal';
import { settingsItems } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchUserDetails } from '@/redux/slices/auth';
import { ROUTES } from '@/routes';

import ProPlanStep from './VerifyProfile/ProPlanStep';
import VerifyProfile from './VerifyProfile/VerificationStep';
import ChangePassword from './ChangePassword';
import Settings from './GeneralSettings';
import ManageSession from './ManageSessions';
import UpdateProfile from './UpdateProfile';
import ViewProfile from './ViewProfile';

const Profile = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

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

  const renderProfilePage = () => {
    switch (location.pathname) {
      case ROUTES.VIEW_PROFILE:
        return <ViewProfile />;
      case ROUTES.UPDATE_PROFILE:
        return <UpdateProfile />;
      case ROUTES.VERIFY_PROFILE:
        return <VerifyProfile />;
      case ROUTES.PRO_PLAN:
        return <ProPlanStep />;
      case ROUTES.SETTINGS:
        return <Settings />;
      case ROUTES.PASSWORD:
        return <ChangePassword />;
      case ROUTES.MANAGE_SESSIONS:
        return <ManageSession />;
      default:
        return (
          <div className='flex justify-center items-center'>
            404: Page Not Found
          </div>
        );
    }
  };

  return (
    <div className='flex bg-black md:bg-grayBackground w-screen h-screen'>
      <SidebarModal
        isProfile
        settingsItems={settingsItems}
        className='rounded-none left-0 w-80 px-7 mt-5 md:mt-20 hidden md:block'
      />

      <div className='flex-grow mt-20 overflow-auto max-h-full scrollbarHidden p-5 md:px-12 md:py-6'>
        {renderProfilePage()}
      </div>
    </div>
  );
};

export default Profile;
