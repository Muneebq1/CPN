import { GetUserRequest, Userdata } from '@/@types/user';
import { COMMON_ERROR } from '@/constants/api';
import { getUserData } from '@/services/userService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUser {
  user: {
    access_token: string;
    userId: string;
  } | null;
  userDetails: Userdata | null;
  otherUserDetails: Userdata | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IUser = {
  user: null,
  userDetails: null,
  otherUserDetails: null,
  status: 'idle',
  error: null,
};

export const fetchUserDetails = createAsyncThunk<
  Userdata | null,
  { data: GetUserRequest; otherUserProfile?: boolean }
>('auth/fetchUserDetails', async ({ data }) => {
  const response = await getUserData({
    // eslint-disable-next-line camelcase
    user_id: data.user_id,
    fetch: data.fetch,
  });
  return response;
});

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.userDetails = null;
    },
    clearOtherUser: (state) => {
      state.otherUserDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      const { payload } = action;
      if (!action.meta.arg.otherUserProfile) state.userDetails = payload;
      if (action.meta.arg.otherUserProfile) state.otherUserDetails = payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? COMMON_ERROR;
    });
  },
});

export const { setUser, clearUser } = AuthSlice.actions;
