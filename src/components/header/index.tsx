import React, { useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

import { DesktopNav, LogoSection } from '@/components/header/HeaderComponents';
import SearchBar from '@/components/header/SearchBar';
import SidebarModal from '@/components/header/sidebarModal';
import { iconRoutes, settingsItems, sidebarItems } from '@/constants';
import { cn } from '@/lib/utils';
import { isClickOutsideModal } from '@/utils/common';
import { isProfileRoute } from '@/utils/routeHelpers';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isProfilePage = isProfileRoute(pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const moreModalRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (route: string) => {
    setIsModalOpen(false);
    navigate(route);
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMoreModal = () => setIsMoreModalOpen(!isMoreModalOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (isClickOutsideModal(event, modalRef)) {
      setIsModalOpen(false);
    }
    if (isClickOutsideModal(event, moreModalRef)) {
      setIsMoreModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, isMoreModalOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 ',
        isProfilePage ? 'bg-black' : 'header',
      )}
    >
      <div className='flex items-center justify-between px-3 xl:px-6 py-4'>
        <div className='flex justify-center items-center'>
          <LogoSection navigate={handleNavigate} />
          <DesktopNav
            navigate={handleNavigate}
            isMoreOpen={isMoreModalOpen}
            setIsMoreOpen={setIsMoreModalOpen}
            toggleMoreModal={toggleMoreModal}
            moreModalRef={moreModalRef}
          />
        </div>
        <div className='flex items-center space-x-1 md:space-x-4 text-white'>
          <SearchBar />
          <button
            className='md:hidden hover:text-gray-300'
            onClick={toggleSidebar}
          >
            {!isSidebarOpen && <HiMenu size={30} />}
          </button>
          <div className='hidden md:flex space-x-4'>
            {iconRoutes.map(({ Icon, route }, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(route)}
                className='hover:text-gray-300'
              >
                <Icon size={30} />
              </button>
            ))}
            <div ref={modalRef}>
              <button className='hover:text-gray-300' onClick={toggleModal}>
                <FiUser size={30} />
              </button>
              {isModalOpen && (
                <div>
                  <SidebarModal
                    setIsModalOpen={setIsModalOpen}
                    settingsItems={settingsItems}
                    className='z-50 right-4 fixed'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <div className='fixed top-0 left-0 h-full w-full bg-black text-white shadow-lg z-40 block md:hidden'>
          <SidebarModal
            setIsModalOpen={setIsModalOpen}
            setToggleSidebar={toggleSidebar}
            showUserProfile={false}
            showLogo={true}
            showButtonIcons={false}
            settingsItems={sidebarItems}
            className='px-5 w-full pb-5 h-full block rounded-none right-0'
          />
        </div>
      )}
    </header>
  );
};

export default Header;
