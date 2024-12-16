import React from 'react';
import { FaAngleDown } from 'react-icons/fa6';

import logo from '@/assets/logo.svg';
import { moreLinks, navLinks } from '@/constants';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

import { Button } from '../ui/button';

export const LogoSection: React.FC<{ navigate: (route: string) => void }> = ({
  navigate,
}) => (
  <div className='flex justify-center md:w-32 w-28 items-center'>
    <img
      onClick={() => navigate(ROUTES.DASHBOARD)}
      src={logo}
      alt='Logo'
      className='cursor-pointer'
      width={155}
      height={53}
    />
  </div>
);

export const DesktopNav: React.FC<{
  navigate: (route: string) => void;
  isMoreOpen: boolean;
  setIsMoreOpen: (isOpen: boolean) => void;
  toggleMoreModal: () => void;
  moreModalRef: React.RefObject<HTMLDivElement>;
}> = ({
  navigate,
  isMoreOpen,
  setIsMoreOpen,
  toggleMoreModal,
  moreModalRef,
}) => (
  <nav className='hidden md:flex text-white'>
    {navLinks.map(({ label, route }) => (
      <Button
        key={label}
        onClick={() => navigate(route)}
        className='hover:text-gray-300 font-normal text-lg xl:text-xl'
      >
        {label}
      </Button>
    ))}
    <div ref={moreModalRef}>
      <MoreDropdown
        navigate={navigate}
        toggleMoreModal={toggleMoreModal}
        isMoreOpen={isMoreOpen}
        setIsMoreOpen={setIsMoreOpen}
      />
    </div>
  </nav>
);

export const MoreDropdown: React.FC<{
  navigate: (route: string) => void;
  isMoreOpen: boolean;
  setIsMoreOpen: (isOpen: boolean) => void;
  toggleMoreModal: () => void;
}> = ({ navigate, isMoreOpen, setIsMoreOpen, toggleMoreModal }) => {
  return (
    <div className='relative'>
      <Button
        onClick={toggleMoreModal}
        icon={<FaAngleDown size={15} />}
        className='hover:text-gray-300 font-normal text-xl flex items-center'
      >
        {strings.Header.more}
      </Button>
      {isMoreOpen && (
        <div className='absolute left-0 mt-2 p-2 bg-black shadow-lg rounded-3xl'>
          {moreLinks.map(({ label, route }, index) => (
            <Button
              key={label}
              onClick={() => {
                navigate(route);
                setIsMoreOpen(false);
              }}
              className={`flex justify-between items-center font-normal rounded-none ${
                index < moreLinks.length - 1 ? 'border-b border-gray-800' : ''
              } pb-2`}
            >
              {label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
