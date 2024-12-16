import { Playlist, RecentSearch } from '@/@types/playlist';
import { Publisher } from '@/@types/posts';
import { COMMON_ERROR } from '@/constants/api';
import {
  fetchRecentSearchesService,
  searchQueryService,
} from '@/services/searchService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum ESearchType {
  PLAYLIST = 'playlist',
  PUBLISHER = 'publisher',
  GROUPS = 'groups',
  CHANNELS = 'channels',
}

interface searchState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: Playlist[] | Publisher[] | any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  recentSearches: RecentSearch[];
  error: string | null;
}

const initialState: searchState = {
  results: [],
  status: 'idle',
  recentSearches: [],
  error: null,
};

export const searchQuery = createAsyncThunk<Playlist[] | Publisher[], string>(
  'search/searchQuery',
  async (query, { rejectWithValue }) => {
    try {
      const results = await searchQueryService({ search_key: query });

      const users = results?.users.map((user) => ({
        ...user,
        type: ESearchType.PUBLISHER,
      }));
      const pages = results?.pages.map((page) => ({
        ...page,
        type: ESearchType.PLAYLIST,
      }));
      const groups = results?.groups.map((group) => ({
        ...group,
        type: ESearchType.GROUPS,
      }));
      const channels = results?.channels.map((group) => ({
        ...group,
        type: ESearchType.CHANNELS,
      }));
      const playlists = results?.playlists.map((group) => ({
        ...group,
        type: ESearchType.PLAYLIST,
      }));

      return [...users, ...pages, ...groups, ...channels, ...playlists].map(
        (item, index) => ({
          ...item,
          id: index + 1,
        }),
      );
    } catch (error) {
      return rejectWithValue('Failed to fetch search results');
    }
  },
);

export const fetchRecentSearches = createAsyncThunk<RecentSearch[]>(
  'search/fetchRecentSearches',
  async (_, { rejectWithValue }) => {
    try {
      const recentSearches = await fetchRecentSearchesService();

      return recentSearches.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    } catch (error) {
      return rejectWithValue('Failed to fetch search results');
    }
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
    },
    clearRecentSearches: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Handle search query results
      .addCase(searchQuery.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchQuery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(searchQuery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      })

      // Handle recent searches
      .addCase(fetchRecentSearches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecentSearches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recentSearches = action.payload;
      })
      .addCase(fetchRecentSearches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      });
  },
});

export const { clearRecentSearches, clearSearchResults } = searchSlice.actions;
