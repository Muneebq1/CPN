/* eslint-disable no-empty-pattern */

import { COMMON_ERROR } from '@/constants/api';
import { IUserData } from '@/pages/Profile/UpdateProfile';
import {
  createUserFeaturedCardsService,
  deleteUserFeaturedCardsService,
  getUserFeaturedCardsService,
  updateUserData,
  updateUserFeaturedCardsService,
} from '@/services/userService';
// import { appendImageToFormData } from '@/utils/media';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeaturedCardValues {
  card_id?: number;
  id?: number;
  user_id?: number;
  title: string;
  link: string;
  image: string;
  enabled: number;
  sort: number;
  isNew?: boolean;
}

interface UserState {
  featuredCards: FeaturedCardValues[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  updatingStatus?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  featuredCards: [],
  status: 'idle',
  error: null,
};

export const getUserFeaturedCards = createAsyncThunk<
  FeaturedCardValues[],
  { user_id?: string }
>(
  'user/getUserFeaturedCards',

  async (payload, { rejectWithValue }) => {
    try {
      const response = await getUserFeaturedCardsService(payload);

      return response.sort((a, b) => a.sort - b.sort);
    } catch (error) {
      return rejectWithValue('Failed to fetch podcasts');
    }
  },
);

export const updateUserFeaturedCards = createAsyncThunk<
  boolean,
  FeaturedCardValues[]
>('user/updateUserFeaturedCards', (payload, { rejectWithValue }) => {
  try {
    payload.forEach(async (card, index) => {
      if (card.isNew) {
        delete card.isNew;
        await createUserFeaturedCardsService({
          ...card,
          sort: index + 1,
        });

        return;
      }
      await updateUserFeaturedCardsService({
        ...card,
        card_id: card.id,
        sort: index + 1,
      });
    });

    return true;
  } catch (error) {
    return rejectWithValue('Failed to update featured cards');
  }
});

export const updateUserProfile = createAsyncThunk<boolean, IUserData>(
  'user/updateUserProfile',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('about', payload.bio);
      formData.append('title', payload.profileTitle);
      formData.append('avatar', payload.avatar);
      // appendImageToFormData(formData, 'avatar', payload.avatar);
      if (payload.socialLinks) {
        Object.entries(payload.socialLinks).forEach(([platform, data]) => {
          formData.append(`${platform}`, data.url);
          formData.append(`is_${platform}`, data.isVisible ? '1' : '0');
        });
      }
      await updateUserData(formData, true);
      dispatch(updateUserFeaturedCards(payload.featuredCards));

      return true;
    } catch (error) {
      return rejectWithValue('Failed to update featured cards');
    }
  },
);

export const deleteUserFeaturedCards = createAsyncThunk<
  boolean,
  { card_id: number }
>(
  'user/deleteUserFeaturedCards',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      await deleteUserFeaturedCardsService(payload);
      dispatch(getUserFeaturedCards({}));

      return true;
    } catch (error) {
      return rejectWithValue('Failed to update featured cards');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFeaturedCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getUserFeaturedCards.fulfilled,
        (state, action: PayloadAction<FeaturedCardValues[]>) => {
          state.featuredCards = action.payload;
          state.status = 'succeeded';
        },
      )
      .addCase(getUserFeaturedCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      })

      // Update user featured cards
      .addCase(updateUserFeaturedCards.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserFeaturedCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      })

      // Update user profile
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.updatingStatus = 'succeeded';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.updatingStatus = 'loading';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updatingStatus = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      });
  },
});

export const {} = userSlice.actions;
