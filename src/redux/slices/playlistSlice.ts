import { Playlist } from '@/@types/playlist';
import { COMMON_ERROR } from '@/constants/api';
import { fetchPlaylistService } from '@/services/playlistService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaylistState {
  playlist: Playlist[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlaylistState = {
  playlist: [],
  status: 'idle',
  error: null,
};

export const fetchPlaylist = createAsyncThunk<Playlist[], { id: string }>(
  'posts/fetchPlaylist',
  async (payload, { rejectWithValue }) => {
    try {
      const playlist = await fetchPlaylistService(payload);

      return playlist;
    } catch (error) {
      return rejectWithValue('Failed to fetch posts');
    }
  },
);

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPlaylist thunk
      .addCase(fetchPlaylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPlaylist.fulfilled,
        (state, action: PayloadAction<Playlist[]>) => {
          state.playlist = action.payload;
          state.status = 'succeeded';
        },
      )
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      });
  },
});

export const { resetState } = playlistSlice.actions;
