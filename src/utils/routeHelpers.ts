import { PROFILE_ROUTES } from '@/constants';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';

export const isProfileRoute = (pathname: string): boolean => {
  return PROFILE_ROUTES.includes(pathname);
};

export const isMobileAppRoute = (): boolean => {
  return window.location.pathname === ROUTES.MOBILE_APP;
};

export const isPublicRoute = (pathname: string): boolean => {
  return Object.values(PUBLIC_ROUTES).includes(pathname);
};
