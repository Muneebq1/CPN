/* eslint-disable camelcase */
import { Channel, FetchChannelRequest, LikeChannelRequest } from '@/@types';
import { COMMON_ERROR } from '@/constants/api';
import {
  fetchChannelService,
  likeChannelService,
} from '@/services/channelService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChannelsState {
  channels: { [key: number | string]: Channel[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  likedChannels: Channel[];
  likeChannelStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChannelsState = {
  channels: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    top: [],
  },
  status: 'idle',
  likedChannels: [],
  likeChannelStatus: 'idle',
  error: null,
};

export const fetchChannels = createAsyncThunk<
  { id?: number; type?: string; data: Channel[] },
  { id?: number; type?: string }
>('channels/fetchChannels', async ({ id, type }) => {
  const payload: { id?: number; type?: string } = {};
  if (id) payload.id = id;
  if (type) payload.type = type;

  const response = await fetchChannelService(payload as FetchChannelRequest);

  return { id, type, data: response };
});
export const fetchLikedChannels = createAsyncThunk<Channel[], { type: string }>(
  'channels/fetchLikedChannels',
  async (payload) => {
    const response = await fetchChannelService(payload as FetchChannelRequest);

    return response;
  },
);

export const likeChannel = createAsyncThunk<
  boolean,
  LikeChannelRequest & { categoryID: number }
>('channels/likeChannel', async ({ channel_id, type }, { dispatch }) => {
  const response = await likeChannelService({ channel_id, type });
  dispatch(fetchLikedChannels({ type: 'liked' }));

  return response?.now_liked as boolean;
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Channels
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchChannels.fulfilled,
        (
          state,
          action: PayloadAction<{
            id?: number;
            type?: string;
            data: Channel[];
          }>,
        ) => {
          state.status = 'succeeded';
          const { id, type, data } = action.payload;

          if (type && !id) {
            state.channels[type] = data;
          } else if (id) {
            state.channels[id] = data;
          }
        },
      )
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      });

    // Fetch Liked Channels
    builder
      .addCase(fetchLikedChannels.pending, (state) => {
        state.likeChannelStatus = 'loading';
      })
      .addCase(fetchLikedChannels.fulfilled, (state, action) => {
        state.likedChannels = action.payload;
        state.likeChannelStatus = 'succeeded';
      })
      .addCase(fetchLikedChannels.rejected, (state, action) => {
        state.likeChannelStatus = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      });

    // Like Channel
    builder.addCase(likeChannel.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(likeChannel.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? COMMON_ERROR;
    });
  },
});
