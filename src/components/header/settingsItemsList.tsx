import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';

import { SettingsItemsListProps } from '@/@types/profile';
import { useAppDispatch } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';
import { clearUser } from '@/redux/slices/auth';
import { clearAS } from '@/utils/localStorage';

import { Button } from '../ui/button';

const SettingsItemsList: React.FC<SettingsItemsListProps> = ({
  items,
  onNavigate,
  showButtonIcons,
  showLogo,
}) => {
  const dispatch = useAppDispatch();
  const logout = (route: string) => {
    clearAS();
    dispatch(clearUser());
    onNavigate(route);
  };

  return (
    <div className='space-y-2'>
      {items.map(({ label, route, icon: Icon }, index) => (
        <div
          key={`${index}-${label}`}
          className={cn(
            'flex justify-between items-center pb-2',
            showLogo || index < items.length - 1
              ? 'border-b border-gray-800'
              : '',
          )}
        >
          <Button
            onClick={
              label === strings.Profile.logout
                ? () => logout(route)
                : () => onNavigate(route)
            }
            className={cn(
              'px-0 font-normal',
              !showButtonIcons ? 'flex justify-start text-sm' : 'text-base',
            )}
            textWithIconClassName='flex justify-end'
            icon={
              Icon ? (
                <Icon
                  size={20}
                  color={
                    label === strings.Profile.verifyProfile ? '#3897F0' : 'red'
                  }
                />
              ) : null
            }
            iconPosition='left'
          >
            {label}
          </Button>
          <FaAngleRight color='#6C6C6C' />
        </div>
      ))}
    </div>
  );
};

export default SettingsItemsList;
