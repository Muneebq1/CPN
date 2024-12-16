/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';

import { HighlightedEpisode, Podcast } from '@/@types/podcasts';
import { Post, YTVideoContent } from '@/@types/posts';
import { API } from '@/api/ApiInstance';
import { CPN, NO_EMBED_API_URL, REST_SUB_URL } from '@/constants/api';

export const fetchPostsService = async (payload: {
  type: string;
  after_post_id?: number | null;
  limit?: number;
}): Promise<Post[]> => {
  const response = await API.Post(
    `${CPN}${REST_SUB_URL.GET_ALL_POSTS}`,
    payload,
  );
  // @ts-ignore
  if (response.status) return response?.data?.data as Post[];

  return [];
};

export const fetchYTVideoDetails = async (payload: {
  src: string;
}): Promise<YTVideoContent> => {
  try {
    const response = await axios.get(`${NO_EMBED_API_URL}${payload.src}`);

    return response?.data as YTVideoContent;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const postActionService = async (payload: {
  post_id: string;
  action:
    | 'reaction'
    | 'edit'
    | 'delete'
    | 'commet'
    | 'like'
    | 'dislike'
    | 'wonder'
    | 'save';
  reaction?: '1' | '2' | '3' | '4' | '5' | '6' | '7';
}) => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.POST_ACTION}`, payload);
  if (response.status) return response.data;

  return;
};

export const hidePostService = async (payload: { post_id: string }) => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.HIDE_POST}`, payload);
  if (response.status) return response.data;

  return;
};

export const fetchPodcastsService = async (payload: {
  // Highlighted podcast
  type: string;
}): Promise<Podcast[]> => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.PODCASTS}`, payload);
  // @ts-ignore
  if (response.status) return response?.data?.podcasts as Podcast[];

  return [];
};

export const createPostService = async (payload: { postText: string }) => {
  const response = await API.Post(`${CPN}${REST_SUB_URL.CREATE_POST}`, payload);
  if (response.status) return response.data;

  return;
};

export const fetchHighlightedEpisodeService = async (payload: {
  slider_id: string;
}): Promise<HighlightedEpisode[]> => {
  const response = await API.Post(
    `${CPN}${REST_SUB_URL.HIGHLIGHTED_EPISODES}`,
    payload,
  );
  // @ts-ignore
  if (response.status) return response?.data?.videos as HighlightedEpisode[];

  return [];
};
