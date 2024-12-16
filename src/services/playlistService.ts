/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Playlist } from '@/@types/playlist';
import { API } from '@/api/ApiInstance';
import { CPN, REST_SUB_URL } from '@/constants/api';

export const fetchPlaylistService = async (payload: {
  id: string;
}): Promise<Playlist[]> => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.PLAYLIST}`, payload);
  // @ts-ignore
  if (response.status) return response?.data?.videos as Playlist[];

  return [];
};
