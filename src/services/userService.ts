/* eslint-disable @typescript-eslint/ban-ts-comment */
import toast from 'react-hot-toast';

import { GetUserRequest, GetUserResponse, Userdata } from '@/@types/user';
import { API } from '@/api/ApiInstance';
import { CPN, REST_SUB_URL, SERVER_KEY } from '@/constants/api';
import { FeaturedCardValues } from '@/redux/slices/userSlice';
import { appendImageToFormData } from '@/utils/media';

export const getUserData = async (
  payload: GetUserRequest,
): Promise<Userdata | null> => {
  const response = await API.Post<GetUserRequest, GetUserResponse>(
    `${CPN}${REST_SUB_URL.GET_USER_DATA}`,
    payload,
  );
  if (response.status) return response.data?.user_data as Userdata;

  return null;
};

export const updateUserData = async (
  payload: unknown,
  isFormData?: boolean,
): Promise<boolean> => {
  const response = await API.Post<
    unknown,
    { api_status: number; message: string }
  >(`${CPN}${REST_SUB_URL.UPDATE_USER_DATA}`, payload, isFormData);
  if (response.data?.api_status === 200) {
    toast.success(response.data.message);
    return true;
  }

  toast.error(response.message);

  return false;
};

export const deleteUserAccount = async (payload: {
  password: string;
}): Promise<boolean> => {
  const response = await API.Post<
    { password: string },
    { api_status: number; message: string }
  >(`${CPN}${REST_SUB_URL.DELETE_ACCOUNT}`, payload);
  if (response.data?.api_status === 200) {
    return true;
  }

  return false;
};

export const getUserFeaturedCardsService = async (payload: {
  user_id?: string;
}): Promise<FeaturedCardValues[]> => {
  const response = await API.Post(
    `${CPN}${REST_SUB_URL.GET_USER_FEATURED_CARDS}`,
    payload,
  );
  // @ts-ignore
  if (response.status) return response.data?.data as FeaturedCardValues[];

  return [];
};

export const createUserFeaturedCardsService = async (
  payload: FeaturedCardValues,
): Promise<boolean> => {
  const formData = new FormData();

  appendImageToFormData(formData, 'image', payload.image);
  // @ts-ignore
  formData.append('card_id', payload?.id);
  formData.append('title', payload.title);
  formData.append('link', payload.link);
  formData.append('enabled', payload.enabled.toString());
  formData.append('sort', payload.sort.toString());
  formData.append('server_key', SERVER_KEY);

  try {
    const response = await API.Post<
      unknown,
      { api_status: number; message: string }
    >(`${CPN}${REST_SUB_URL.ADD_USER_FEATURED_CARDS}`, formData, true);

    if (response.data?.api_status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error while creating featured card:', error);

    return false;
  }
};

export const updateUserFeaturedCardsService = async (
  payload: FeaturedCardValues,
): Promise<boolean> => {
  const formData = new FormData();

  appendImageToFormData(formData, 'image', payload.image);
  // @ts-ignore
  formData.append('card_id', payload?.id);
  formData.append('title', payload.title);
  formData.append('link', payload.link);
  formData.append('enabled', payload.enabled.toString());
  formData.append('sort', payload.sort.toString());
  formData.append('server_key', SERVER_KEY);

  try {
    const response = await API.Post<
      unknown,
      { api_status: number; message: string }
    >(`${CPN}${REST_SUB_URL.UPDATE_USER_FEATURED_CARDS}`, formData, true);

    if (response.data?.api_status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error updating featured card:', error);

    return false;
  }
};

export const deleteUserFeaturedCardsService = async (payload: {
  card_id: number;
}): Promise<boolean> => {
  const response = await API.Post<
    { card_id: number },
    { api_status: number; message: string }
  >(`${CPN}${REST_SUB_URL.DELETE_USER_FEATURED_CARDS}`, payload);
  if (response.data?.api_status === 200) {
    return true;
  }

  return false;
};
