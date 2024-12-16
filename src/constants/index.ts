/* eslint-disable camelcase */
import { UseFormGetValues } from 'react-hook-form';
import { IconType } from 'react-icons';
import { BsPatchCheckFill } from 'react-icons/bs';
import {
  FiLogOut,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi';
import { HiOutlineBookmark } from 'react-icons/hi';
import { MdDevices } from 'react-icons/md';

import { Slide } from '@/@types';
import { ILoginFields, ISignupFields } from '@/@types/auth';
import { IChangePassword } from '@/@types/profile';
import { strings } from '@/locales';
import { PUBLIC_ROUTES, ROUTES } from '@/routes';
import {
  // birthdayValidation,
  // calculateAge,
  confirmPasswordValidation,
  validationRules,
} from '@/utils/validationSchema';

import carousel from '../assets/jpgs/carousel.jpg';
import carouselMobile from '../assets/jpgs/carousel-mobile.jpg';
import poster from '../assets/svgs/Poster1.svg';
import poster2 from '../assets/svgs/Poster2.svg';

export const navLinks = [
  { label: strings.Header.business, route: ROUTES.BUSINESS },
  { label: strings.Header.comedy, route: ROUTES.COMEDY },
  { label: strings.Header.sports, route: ROUTES.SPORTS },
  { label: strings.Header.news, route: ROUTES.NEWS },
  { label: strings.Header.entertainment, route: ROUTES.ENTERTAINMENT },
];

export const moreLinks = [
  { label: strings.Header.music, route: ROUTES.MUSIC },
  { label: strings.Header.culture, route: ROUTES.CULTURE },
  { label: strings.Header.relationships, route: ROUTES.RELATIONSHIPS },
  { label: strings.Header.mentalHealth, route: ROUTES.MENTAL_HEALTH },
  { label: strings.Header.leisure, route: ROUTES.LEISURE },
];

export const footerLinks = [
  { label: strings.Footer.termsOfUse, route: ROUTES.TERMS },
  { label: strings.Footer.privacyPolicy, route: ROUTES.PRIVACY },
  { label: strings.Footer.legalNotices, route: ROUTES.LEGAL },
  { label: strings.Footer.networkTeam, route: ROUTES.TEAM },
  { label: strings.Footer.contactUs, route: ROUTES.CONTACT },
  { label: strings.Footer.blog, route: ROUTES.BLOG },
  { label: strings.Footer.about, route: ROUTES.ABOUT },
];

export const appStoreLinks = [
  {
    route: 'https://www.apple.com/app-store/',
    imgSrc:
      'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
    alt: strings.Footer.downloadApp,
  },
  {
    route: 'https://play.google.com/store',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg',
    alt: strings.Footer.getInPlayStore,
  },
];

export const settingsItems: Array<{
  label: string;
  route: string;
  icon: IconType;
}> = [
  {
    label: strings.Profile.updateProfile,
    route: ROUTES.UPDATE_PROFILE,
    icon: FiUser,
  },
  {
    label: strings.Profile.verifyProfile,
    route: ROUTES.VERIFY_PROFILE,
    icon: BsPatchCheckFill,
  },
  {
    label: strings.Profile.generalSettings,
    route: ROUTES.SETTINGS,
    icon: FiSettings,
  },
  {
    label: strings.Profile.password,
    route: ROUTES.PASSWORD,
    icon: FiShield,
  },
  {
    label: strings.Profile.manageSessions,
    route: ROUTES.MANAGE_SESSIONS,
    icon: MdDevices,
  },
  {
    label: strings.Profile.logout,
    route: PUBLIC_ROUTES.SIGNIN,
    icon: FiLogOut,
  },
];

export const sidebarItems: Array<{
  label: string;
  route: string;
}> = [
  {
    label: strings.Profile.backToHome,
    route: ROUTES.DASHBOARD,
  },
  {
    label: strings.Profile.updateProfile,
    route: ROUTES.UPDATE_PROFILE,
  },
  {
    label: strings.Profile.verifyProfile,
    route: ROUTES.VERIFY_PROFILE,
  },
  {
    label: strings.Profile.generalSettings,
    route: ROUTES.SETTINGS,
  },
  {
    label: strings.Profile.password,
    route: ROUTES.PASSWORD,
  },
  {
    label: strings.Profile.manageSessions,
    route: ROUTES.MANAGE_SESSIONS,
  },
  {
    label: strings.Profile.logout,
    route: ROUTES.DASHBOARD,
  },
];

export const iconRoutes = [
  { Icon: FiTrendingUp, route: ROUTES.CHARTS },
  { Icon: HiOutlineBookmark, route: ROUTES.SAVED },
];
export const profileCard = {
  image: poster,
  title: 'Normalize being awful else you will be banned and maybe not.',
  profile: {
    name: 'Alexander Devonne',
    time: '6d',
    platform: 'YouTube',
  },
};
const card = {
  image: poster,
  title: 'Normalize being awful',
};
const subscriptionCard = {
  image: poster2,
  subscription: {
    name: 'Stay in Prince’s Purple Rain House',
    description:
      'The world’s most dangerous morning show, The breakfast more and more and something which is more dangerouse',
  },
  title: '',
};

export const profileCardData = [
  profileCard,
  profileCard,
  profileCard,
  profileCard,
  profileCard,
  profileCard,
  profileCard,
  profileCard,
];
export const cardData = [card, card, card, card, card, card, card, card];

export const subscriptionCardData = [
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
  subscriptionCard,
];

export const PROFILE_ROUTES = [
  ROUTES.VIEW_PROFILE,
  ROUTES.UPDATE_PROFILE,
  ROUTES.VERIFY_PROFILE,
  ROUTES.PRO_PLAN,
  ROUTES.SETTINGS,
  ROUTES.PASSWORD,
  ROUTES.MANAGE_SESSIONS,
];

export const dashboardSlides: Slide[] = [
  {
    id: 1,
    image: carousel,
    mobileImage: carouselMobile,
  },
  {
    id: 2,
    image: carousel,
    mobileImage: carouselMobile,
  },
  {
    id: 3,
    image: carousel,
    mobileImage: carouselMobile,
  },
  {
    id: 4,
    image: carousel,
    mobileImage: carouselMobile,
  },
  {
    id: 5,
    image: carousel,
    mobileImage: carouselMobile,
  },
  {
    id: 6,
    image: carousel,
    mobileImage: carouselMobile,
  },
];

export enum SignUpFields {
  Username = 'username',
  Email = 'email',
  Birthday = 'birthday',
  Password = 'password',
  ConfirmPassword = 'confirm_password',
}

export const INITIAL_VALUES: ISignupFields = {
  username: '',
  email: '',
  birthday: '',
  password: '',
  confirm_password: '',
};

export const signUpFields = (getValues: UseFormGetValues<ISignupFields>) => [
  {
    name: SignUpFields.Username,
    type: 'text',
    placeholder: 'Username',
    validation: validationRules.username,
  },
  {
    name: SignUpFields.Email,
    type: 'email',
    placeholder: 'Email',
    validation: validationRules.email,
  },
  {
    name: SignUpFields.Birthday,
    type: 'date',
    placeholder: 'Birthday(mm,dd,yyyy)',
    // validation: birthdayValidation(calculateAge),
  },
  {
    name: SignUpFields.Password,
    type: 'password',
    placeholder: 'Password',
    validation: validationRules.passwordValidation,
  },
  {
    name: SignUpFields.ConfirmPassword,
    type: 'password',
    placeholder: 'Confirm Password',
    validation: confirmPasswordValidation(getValues, 'password'),
  },
];

export enum LoginField {
  USERNAME = 'username',
  PASSWORD = 'password',
  SAVE_LOGIN_INFO = 'saveLoginInfo',
}

export const LogInFields = [
  {
    name: LoginField.USERNAME,
    placeholder: 'Username',
    type: 'text',
    validation: validationRules.username,
  },
  {
    name: LoginField.PASSWORD,
    placeholder: 'Password',
    type: 'password',
    validation: validationRules.passwordValidation,
  },
  {
    name: LoginField.SAVE_LOGIN_INFO,
    type: 'checkbox',
  },
];

export const Login_Initial: ILoginFields = {
  username: '',
  password: '',
  saveLoginInfo: false,
};

export const ChangePasswordValues: IChangePassword = {
  current_password: '',
  new_password: '',
  confirm_password: '',
};
