export enum STORAGE_KEYS {
  AUTH_TOKEN = 'AUTH_TOKEN',
  USER_ID = 'USER_ID',
  THEME = 'THEME',
}

export const setTokenToAS = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const setItemToAS = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
export const getTokenFromAS = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getItemFromAS = () => {
  return localStorage.getItem(STORAGE_KEYS.USER_ID);
};
export const clearAS = () => {
  localStorage.clear();
};
