import {
  Channel,
  ChannelsResponse,
  FetchChannelRequest,
  LikeChannelRequest,
  LikeChannelResponse,
} from '@/@types';
import { API } from '@/api/ApiInstance';
import { CPN, REST_SUB_URL } from '@/constants/api';

export const fetchChannelService = async (
  payload: FetchChannelRequest,
): Promise<Channel[]> => {
  const url = `${CPN}${REST_SUB_URL.CHANNEL}`;
  const response = await API.Post<FetchChannelRequest, ChannelsResponse>(
    url,
    payload,
  );
  if (response.data?.api_status === 200) {
    return response.data.channels as Channel[];
  }

  return [];
};

export const likeChannelService = async (payload: LikeChannelRequest) => {
  const url = `${CPN}${REST_SUB_URL.LIKE_CHANNEL}`;
  const response = await API.Post<LikeChannelRequest, LikeChannelResponse>(
    url,
    payload,
  );
  if (response.data?.api_status === 200) return response.data;

  return null;
};
