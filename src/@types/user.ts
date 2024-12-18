export interface GetUserRequest {
  user_id: string;
  fetch: string;
  otherUserProfile?: boolean;
}

export interface GetUserResponse {
  api_status: number;
  user_data: Userdata;
}

export interface Userdata {
  user_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  cover: string;
  background_image: string;
  relationship_id: string;
  address: string;
  working: string;
  working_link: string;
  about: null;
  school: string;
  gender: string;
  birthday: string;
  country_id: string;
  website: string;
  facebook: string;
  is_facebook: '1' | '0';
  google: string;
  is_google: '1' | '0';
  twitter: string;
  is_twitter: '1' | '0';
  linkedin: string;
  is_linkedin: '1' | '0';
  youtube: string;
  is_youtube: '1' | '0';
  vk: string;
  is_vk: '1' | '0';
  instagram: string;
  is_instagram: '1' | '0';
  qq: string;
  is_qq: '1' | '0';
  wechat: string;
  discord: string;
  is_discord: '1' | '0';
  mailru: string;
  is_mailru: '1' | '0';
  okru: string;
  is_okru: '1' | '0';
  tiktok: string;
  is_tiktok: '1' | '0';
  language: string;
  ip_address: string;
  follow_privacy: string;
  friend_privacy: string;
  post_privacy: string;
  message_privacy: string;
  confirm_followers: string;
  show_activities_privacy: string;
  birth_privacy: string;
  visit_privacy: string;
  verified: string;
  lastseen: string;
  emailNotification: string;
  e_liked: string;
  e_wondered: string;
  e_shared: string;
  e_followed: string;
  e_commented: string;
  e_visited: string;
  e_liked_page: string;
  e_mentioned: string;
  e_joined_group: string;
  e_accepted: string;
  e_profile_wall_post: string;
  e_sentme_msg: string;
  e_last_notif: string;
  notification_settings: string;
  status: string;
  active: string;
  admin: string;
  registered: string;
  phone_number: string;
  is_pro: string;
  pro_type: string;
  pro_remainder: string;
  timezone: string;
  referrer: string;
  ref_user_id: string;
  ref_level: null;
  balance: string;
  paypal_email: string;
  notifications_sound: string;
  order_posts_by: string;
  android_m_device_id: string;
  ios_m_device_id: string;
  android_n_device_id: string;
  ios_n_device_id: string;
  web_device_id: string;
  wallet: string;
  lat: string;
  lng: string;
  last_location_update: string;
  share_my_location: string;
  last_data_update: string;
  details: Details;
  last_avatar_mod: string;
  last_cover_mod: string;
  points: string;
  daily_points: string;
  converted_points: string;
  point_day_expire: string;
  last_follow_id: string;
  share_my_data: string;
  last_login_data: null;
  two_factor: string;
  two_factor_hash: string;
  new_email: string;
  two_factor_verified: string;
  new_phone: string;
  info_file: string;
  city: string;
  state: string;
  zip: string;
  school_completed: string;
  weather_unit: string;
  paystack_ref: string;
  code_sent: string;
  time_code_sent: string;
  permission: null;
  skills: null;
  languages: null;
  currently_working: string;
  banned: string;
  banned_reason: string;
  likes_count: string;
  last_count: string;
  oneId: string;
  color: string;
  avatar_post_id: number;
  cover_post_id: number;
  avatar_full: string;
  user_platform: string;
  url: string;
  name: string;
  API_notification_settings: APInotificationsettings;
  is_notify_stopped: number;
  mutual_friends_data: string;
  lastseen_unix_time: string;
  lastseen_status: string;
  is_reported: boolean;
  is_story_muted: boolean;
  is_following_me: number;
  is_reported_user: number;
  is_open_to_work: number;
  is_providing_service: number;
  providing_service: number;
  open_to_work_data: string;
  formated_langs: unknown[];
  is_following: number;
  can_follow: number;
  gender_text: null;
  lastseen_time_text: string;
  is_blocked: boolean;
  title?: string;
}

interface APInotificationsettings {
  e_liked: number;
  e_shared: number;
  e_wondered: number;
  e_commented: number;
  e_followed: number;
  e_accepted: number;
  e_mentioned: number;
  e_joined_group: number;
  e_liked_page: number;
  e_visited: number;
  e_profile_wall_post: number;
  e_memory: number;
}

interface Details {
  post_count: string;
  album_count: string;
  following_count: string;
  followers_count: string;
  groups_count: string;
  likes_count: string;
  mutual_friends_count: number;
}
