export const BASE_URL =
  process.env.REACT_APP_SERVER_URL! || 'https://cpnpodcast.com';
export const SERVER_KEY =
  process.env.REACT_APP_SERVER_KEY! || '271b909978960540449aac8c170f7077';
export const NO_EMBED_API_URL =
  process.env.REACT_APP_NO_EMBED_API_URL || 'https://noembed.com/embed?url=';
export const CPN = '/cpn';

const AUTH_SUB_URL = {
  LOGIN: '/auth',
  SIGNUP: '/create-account',
  OTP: '/otp',
  SET_PASSWORD: '/set_password',
};

const POST_SUB_URL = {
  CREATE_POST: '/new_post',
  GET_ALL_POSTS: '/posts',
  POST_ACTION: '/post-actions',
  HIDE_POST: '/hide_post',
  CHANNEL: '/channel',
  LIKE_CHANNEL: '/likeChannel',
  PLAYLIST: '/playlist',
  SEARCH: '/search',
  RECENT_SEARCHES: '/recent_search',
  GET_USER_DATA: '/get-user-data',
  UPDATE_USER_DATA: '/update-user-data',
  PODCASTS: '/podcasts',
  GET_ALL_SESSIONS: '/sessions',
  SESSIONS: '/sessions',
  DELETE_ACCOUNT: '/delete_account',
  GET_USER_FEATURED_CARDS: '/select_cards',
  ADD_USER_FEATURED_CARDS: '/add_card',
  UPDATE_USER_FEATURED_CARDS: '/update_card',
  DELETE_USER_FEATURED_CARDS: '/delete_card',
  HIGHLIGHTED_EPISODES: '/sliders',
  GET_NOTIFICATIONS: '/notifications',
};

export const REST_SUB_URL = {
  ...POST_SUB_URL,
  ...AUTH_SUB_URL,
};

export const COMMON_ERROR = 'Something went wrong!';
