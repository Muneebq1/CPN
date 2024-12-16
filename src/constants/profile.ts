import { UseFormSetValue } from 'react-hook-form';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import {
  IDropdownOption,
  IGeneralSettings,
  PasswordType,
  SocialLink,
} from '@/@types/profile';
import image1 from '@/assets/jpgs/verifyProfile1.png';
import image2 from '@/assets/jpgs/verifyProfile2.png';
import image3 from '@/assets/jpgs/verifyProfile3.png';
import countries from '@/constants/countries.json';
import { strings } from '@/locales';
import { EnumToArray } from '@/utils/common';
import { validationRules } from '@/utils/validationSchema';

export const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    icon: FaInstagram,
  },
  {
    id: 'facebook',
    icon: FaFacebook,
  },
  {
    id: 'twitter',
    icon: FaTwitter,
  },
  {
    id: 'tiktok',
    icon: FaTiktok,
  },
  {
    id: 'youtube',
    icon: FaYoutube,
  },
];

export const stepsData = [
  {
    heading: 'Tell us about your podcast.',
    content:
      "Share some basic info, like what it's about, your planned schedule for drops, and what category.",
    image: image1,
  },
  {
    heading: 'Make it stand out.',
    content:
      'Make sure you add a profile photo so users can easily identify your channel.',
    image: image2,
  },
  {
    heading: 'Finish up and get verified.',
    content:
      'Once your account is verified, you will have access to promote your episodes to the podcast community.',
    image: image3,
  },
];

export const features = [
  'Verified Badge',
  'Import Podcast directly from YouTube',
  'Videos remain on timeline for 30 calendar days',
  'Organic views that count towards your YouTube analytics',
  'After your 10th episode, the channel goes to review as an official CPN Channel',
];

export const passwordFields = [
  {
    label: 'Current Password',
    name: PasswordType.Current,
    placeholder: 'Please enter your current password',
  },
  {
    label: 'New Password',
    name: PasswordType.New,
    placeholder: 'Please enter your new password',
  },
  {
    label: 'Repeat Password',
    name: PasswordType.Confirm,
    placeholder: 'Please Re-enter the new password',
  },
];

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export const COUNTRY_LIST = Object.entries(countries).map(([key, value]) => ({
  label: value,
  value: key,
}));

export enum GeneralSettingsFields {
  Username = 'username',
  Email = 'email',
  PhoneNumber = 'phone_number',
  Gender = 'gender',
  Country = 'country_id',
  Verification = 'verification',
}

const gender = EnumToArray(Gender);

const genderOptions = (
  setValue: UseFormSetValue<IGeneralSettings>,
): IDropdownOption[] =>
  gender.map((gender) => ({
    label: gender,
    value: gender,
    onClick: () => setValue('gender', gender),
  }));

const countryList = (
  setValue: UseFormSetValue<IGeneralSettings>,
): IDropdownOption[] =>
  Object.entries(countries).map(([key, value]) => ({
    label: value,
    value: key,
    onClick: () => setValue('country_id', key),
  }));

export const GeneralSettingsField = [
  {
    label: strings.Profile.username,
    name: GeneralSettingsFields.Username,
    type: 'text',
    isDisabled: true,
  },
  {
    label: strings.Profile.email,
    name: GeneralSettingsFields.Email,
    placeholder: 'coolpeoplenetwork1@gmail.com',
    type: 'email',
    validation: validationRules.email,
  },
  {
    label: strings.Profile.phone,
    name: GeneralSettingsFields.PhoneNumber,
    placeholder: 'Please enter your phone number',
    type: 'tel',
    validation: validationRules.phone,
  },
  {
    label: strings.Profile.gender,
    name: GeneralSettingsFields.Gender,
    options: genderOptions,
  },
  {
    label: strings.Profile.country,
    name: GeneralSettingsFields.Country,
    options: countryList,
  },
  {
    label: strings.Profile.verification,
    name: GeneralSettingsFields.Verification,
    type: 'text',
    isDisabled: true,
  },
];
