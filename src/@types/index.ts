import { Dispatch, SetStateAction } from 'react';

export {};

export type APIResponse<T> = {
  status: boolean;
  message: string;
  data: T | null;
};

export type EnumType<T> = {
  [key in keyof T]: T[key] extends string | number ? T[key] : never;
};

export interface SearchProps {
  searchIcon?: React.ReactNode;
  searchText?: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}
export interface Slide {
  id: number;
  image: string;
  mobileImage: string;
}
export interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

export interface UserModalProps {
  settingsItems: Array<IconOptions>;
  setToggleSidebar?: () => void;
  showUserProfile?: boolean;
  showLogo?: boolean;
  showButtonIcons?: boolean;
  className?: string;
  isProfile?: boolean;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export interface IconOptions {
  label: string;
  route: string;
  icon?: React.ComponentType<{ size: number; color?: string }>;
}

export interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}
export interface CardProps {
  image?: string;
  title: string;
  name?: string;
  description?: string;
  isCarousel?: boolean;
  profile?: {
    name: string;
    time: string;
    platform: string;
  };
  subscription?: boolean;
  allData?: boolean;
  isLiked?: boolean;
  categoryId?: number;
  id?: number;
  url?: string;
  isPodcast?: boolean;
}
export interface chartCardProp {
  image?: string;
  index: number;
  description?: string;
  name?: string;
  url?: string;
}
export interface CardSectionProps {
  title: string;
  data: CardProps[];
  viewAllRoute?: string;
  allData?: boolean;
  subscription?: boolean;
}

interface Category {
  id: number;
  channel: number;
  title: string;
}

export interface FetchChannelRequest {
  id?: string;
  type?: string;
}

export interface Channel {
  category_id: number;
  id: number;
  name: string;
  icon: string;
  url: string;
  youtube_url: string;
  image: string;
  description: string;
  like_count: number;
  is_liked: number;
}

export type ChannelsResponse = {
  api_status: number;
  channels: Channel[];
  categories: Category[];
};

export type LikeChannelRequest = {
  channel_id: number;
  type: 'like' | 'dislike';
};

export type LikeChannelResponse = {
  api_status: number;
  channel_id: number;
  now_liked: boolean;
};
