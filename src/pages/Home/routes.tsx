/* eslint-disable max-lines */
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { PROFILE_ROUTES } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/redux/slices/auth';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';
import { getItemFromAS, getTokenFromAS } from '@/utils/localStorage';
import {
  isMobileAppRoute,
  isProfileRoute,
  isPublicRoute,
} from '@/utils/routeHelpers';

import ForgetPassword from '../Auth/ForgetPassword';
import SetNewPassword from '../Auth/SetNewPassword';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import Business from '../Business';
import Charts from '../Charts';
import Comedy from '../Comedy';
import Culture from '../Culture';
import Dashboard from '../Dashboard';
import Entertainment from '../Entertainment';
import Leisure from '../Leisure';
import MentalHealth from '../MentalHealth';
import MobileApp from '../MobileApp';
import Music from '../Music';
import News from '../News';
import PodcastVideo from '../PodcastVideo';
import Profile from '../Profile';
import Relationships from '../RelationShips';
import Saved from '../Saved';
import Sports from '../Sports';
import Video from '../Video';
// import Video from '../Video';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { pathname } = location;
  const { access_token } = useAppSelector((state) => {
    return {
      access_token: state?.auth?.user,
    };
  });

  const handleRouteNotFound = () => {
    if (access_token) {
      return <Navigate to={ROUTES.DASHBOARD} />;
    }
    return <Navigate to={PUBLIC_ROUTES.SIGNIN} />;
  };
  const getUserInfoFromAS = () => {
    const access_token = getTokenFromAS();
    const userId = getItemFromAS();

    if (access_token && userId) {
      dispatch(setUser({ access_token, userId }));
    }
  };
  useEffect(() => {
    getUserInfoFromAS();
  }, []);

  return (
    <div className='bg-black text-white w-screen overflow-auto h-screen'>
      <Toaster />
      {!isMobileAppRoute() && !isPublicRoute(pathname) ? <Header /> : null}
      <div className=''>
        <Routes>
          <Route
            path={ROUTES.DASHBOARD}
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path={ROUTES.BUSINESS}
            element={<ProtectedRoute element={<Business />} />}
          />
          <Route
            path={ROUTES.COMEDY}
            element={<ProtectedRoute element={<Comedy />} />}
          />
          <Route
            path={ROUTES.ENTERTAINMENT}
            element={<ProtectedRoute element={<Entertainment />} />}
          />
          <Route
            path={ROUTES.SPORTS}
            element={<ProtectedRoute element={<Sports />} />}
          />
          <Route
            path={ROUTES.CHARTS}
            element={<ProtectedRoute element={<Charts />} />}
          />
          <Route
            path={ROUTES.SAVED}
            element={<ProtectedRoute element={<Saved />} />}
          />
          <Route
            path={ROUTES.NEWS}
            element={<ProtectedRoute element={<News />} />}
          />
          <Route
            path={ROUTES.MUSIC}
            element={<ProtectedRoute element={<Music />} />}
          />
          <Route
            path={ROUTES.CULTURE}
            element={<ProtectedRoute element={<Culture />} />}
          />
          <Route
            path={ROUTES.RELATIONSHIPS}
            element={<ProtectedRoute element={<Relationships />} />}
          />
          <Route
            path={ROUTES.MENTAL_HEALTH}
            element={<ProtectedRoute element={<MentalHealth />} />}
          />
          <Route
            path={ROUTES.LEISURE}
            element={<ProtectedRoute element={<Leisure />} />}
          />
          <Route
            path={ROUTES.VIDEO_PLAYER}
            element={<ProtectedRoute element={<Video />} />}
          />
          <Route
            path={ROUTES.PODCAST_VIDEO_PLAYER}
            element={<ProtectedRoute element={<PodcastVideo />} />}
          />
          <Route
            path={ROUTES.MOBILE_APP}
            element={<ProtectedRoute element={<MobileApp />} />}
          />
          {PROFILE_ROUTES.map((route, index) => (
            <Route
              key={`profile-${index}`}
              path={route}
              element={<ProtectedRoute element={<Profile />} />}
            />
          ))}
          {/* Public Routes */}
          <Route
            path={PUBLIC_ROUTES.SIGNIN}
            element={<PublicRoute element={<SignIn />} />}
          />
          <Route
            path={PUBLIC_ROUTES.SIGNUP}
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route
            path={PUBLIC_ROUTES.FORGOT_PASSWORD}
            element={<PublicRoute element={<ForgetPassword />} />}
          />
          <Route
            path={PUBLIC_ROUTES.SET_NEW_PASSWORD}
            element={<PublicRoute element={<SetNewPassword />} />}
          />
          <Route path='*' element={handleRouteNotFound()} />
        </Routes>
      </div>
      {!isProfileRoute(pathname) &&
      !isMobileAppRoute() &&
      !isPublicRoute(pathname) ? (
        <Footer />
      ) : null}
    </div>
  );
};
export default App;
