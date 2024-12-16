import { ReactNode } from 'react';
import { Control, FieldErrors, Path, RegisterOptions } from 'react-hook-form';
import { IconType } from 'react-icons';

import { IconOptions } from '.';

export interface SocialLinksState {
  [key: string]: string | boolean;
  instagramLink: string;
  facebookLink: string;
  twitterLink: string;
  tiktokLink: string;
  youtubeLink: string;
  isInstagramVisible: boolean;
  isFacebookVisible: boolean;
  isTwitterVisible: boolean;
  isTiktokVisible: boolean;
  isYoutubeVisible: boolean;
}

export interface SocialLink {
  id: string;
  icon: IconType;
}

export interface StepProps {
  heading: string;
  content: string;
  image: string;
  stepNumber: number;
  isLastStep: boolean;
}
export interface IDropdownMenuItems {
  label: string;
  onClick: () => void;
  icon?: JSX.Element | string;
}

export interface MenuProps {
  options: IDropdownMenuItems[];
  selectedValue: string | number;
  leftIcon?: ReactNode;
  placeholder?: string;
  disable?: boolean;
  className?: string;
  onSelect?: (value: string) => void;
}

export interface IGeneralSettings {
  username?: string;
  email: string;
  phone_number: string;
  gender?: string;
  country_id?: string;
  verification?: string;
}

export interface IChangePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface SettingsItemsListProps {
  items: Array<IconOptions>;
  onNavigate: (route: string) => void;
  showButtonIcons: boolean;
  showLogo: boolean;
}

export const enum PasswordType {
  Current = 'current_password',
  New = 'new_password',
  Confirm = 'confirm_password',
}

export interface PasswordFieldProps {
  label: string;
  name: PasswordType;
  placeholder: string;
  control: Control<IChangePassword>;
  errors: FieldErrors<IChangePassword>;
  type: string;
  rules: RegisterOptions<IChangePassword, PasswordType>;
}

export interface FormFieldProps {
  label: string;
  placeholder?: string;
  name: Path<IGeneralSettings>;
  control: Control<IGeneralSettings>;
  errors: FieldErrors<IGeneralSettings>;
  type?: string;
  validation?: RegisterOptions<IGeneralSettings>;
  value?: string;
  disabled?: boolean;
}

export interface IDropdownOption {
  label: string;
  value: string;
  onClick: () => void;
}
