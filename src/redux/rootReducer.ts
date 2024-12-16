import { combineReducers } from '@reduxjs/toolkit';

import { AuthSlice } from './slices/auth';
import { channelsSlice } from './slices/channelSlice';
import { playlistSlice } from './slices/playlistSlice';
import { postsSlice } from './slices/postsSlice';
import { searchSlice } from './slices/searchSlice';
import { userSlice } from './slices/userSlice';

const rootReducer = combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
  [postsSlice.name]: postsSlice.reducer,
  [playlistSlice.name]: playlistSlice.reducer,
  [channelsSlice.name]: channelsSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
