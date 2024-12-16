/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Channel } from '@/@types';
import { Playlist, RecentSearch } from '@/@types/playlist';
import { Publisher } from '@/@types/posts';
import { API } from '@/api/ApiInstance';
import { CPN, REST_SUB_URL } from '@/constants/api';

export const searchQueryService = async (payload: {
  search_key?: string;
  country?: string;
  status?: string;
  verified?: string;
  gender?: string;
  filterbyage?: string;
  age_from?: string;
  age_to?: string;
}): Promise<{
  api_status: number;
  users: Publisher[];
  pages: Playlist[];
  channels: Channel[];
  playlists: Playlist[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groups: any[];
}> => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.SEARCH}`, payload);
  if (response.status)
    return response.data as {
      users: Publisher[];
      pages: [];
      groups: [];
      channels: [];
      playlists: [];
      api_status: number;
    };

  return {
    users: [],
    pages: [],
    groups: [],
    channels: [],
    playlists: [],
    api_status: 0,
  };
};

export const fetchRecentSearchesService = async (): Promise<RecentSearch[]> => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.RECENT_SEARCHES}`);
  if (response.status)
    // @ts-ignore
    return response.data.data;

  return [];
};
