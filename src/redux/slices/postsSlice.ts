/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
import {
  EpisodeCarouselType,
  EpisodesCarousel,
  HighlightedEpisode,
  Podcast,
} from '@/@types/podcasts';
import { Post } from '@/@types/posts';
import { COMMON_ERROR } from '@/constants/api';
import {
  createPostService,
  fetchHighlightedEpisodeService,
  fetchPodcastsService,
  fetchPostsService,
  postActionService,
} from '@/services/postsService';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../rootReducer';
import { AppDispatch } from '../store';

interface PostsState {
  posts: Post[];
  postStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  savedPosts: Post[];
  savedPostStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  podcasts: Podcast[];
  podcastsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  highlightedEpisodes: EpisodesCarousel;
  highEpisodesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  after_post_id: number | null;
  hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  postStatus: 'idle',
  savedPosts: [],
  savedPostStatus: 'idle',
  podcasts: [],
  podcastsStatus: 'idle',
  highlightedEpisodes: {
    carousel1: {
      episodes: [],
      type: EpisodeCarouselType.carousel1,
    },
    carousel2: {
      episodes: [],
      type: EpisodeCarouselType.carousel2,
    },
    carousel3: {
      episodes: [],
      type: EpisodeCarouselType.carousel3,
    },
  },
  highEpisodesStatus: 'idle',
  error: null,
  after_post_id: null,
  hasMore: true,
};

export const fetchPosts = createAsyncThunk<
  { posts: Post[]; after_post_id: number | null },
  { type: string; after_post_id?: number | null; limit?: number }
>('posts/fetchPosts', async (payload, { rejectWithValue }) => {
  try {
    const response = await fetchPostsService(payload);
    const lastPostId =
      // @ts-ignore
      response.length > 0 ? Number(response[response.length - 1].id) : null;

    return { posts: response, after_post_id: lastPostId };
  } catch (error) {
    return rejectWithValue('Failed to fetch posts');
  }
});

export const fetchSavedPosts = createAsyncThunk<
  Post[],
  { type: string; id: string }
>('posts/fetchSavedPosts', async (payload, { rejectWithValue }) => {
  try {
    const posts = await fetchPostsService(payload);

    return posts;
  } catch (error) {
    return rejectWithValue('Failed to fetch posts');
  }
});

export const fetchPodcasts = createAsyncThunk<Podcast[], { type: string }>(
  'posts/fetchPodcasts',
  async (payload, { rejectWithValue }) => {
    try {
      const podcasts = await fetchPodcastsService(payload);

      return podcasts;
    } catch (error) {
      return rejectWithValue('Failed to fetch podcasts');
    }
  },
);

export const fetchHighlightedEpisode = createAsyncThunk<
  { episodes: HighlightedEpisode[]; type: keyof EpisodesCarousel },
  { slider_id: string; type: keyof EpisodesCarousel }
>('posts/fetchHighlightedEpisode', async (payload, { rejectWithValue }) => {
  try {
    const episodes = await fetchHighlightedEpisodeService({
      slider_id: payload.slider_id,
    });

    return { episodes, type: payload.type };
  } catch (error) {
    return rejectWithValue('Failed to fetch highlighted episodes');
  }
});

// export const hidePost = createAsyncThunk<void, string>(
//   'posts/hidePost',
//   async (post_id, { rejectWithValue }) => {
//     try {
//       await hidePostService({ post_id });
//     } catch (error) {
//       return rejectWithValue('Failed to fetch posts');
//     }
//   },
// );

export const postAction = createAsyncThunk<
  void,
  {
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
  }
>(
  'posts/postAction',
  async ({ post_id, action, reaction }, { rejectWithValue }) => {
    try {
      await postActionService({
        post_id,
        action,
        reaction,
      });

      // dispatch(fetchSavedPosts({ type: 'saved', id: '2' }));
    } catch (error) {
      return rejectWithValue('Failed to fetch posts');
    }
    return;
  },
);

export const createPost = createAsyncThunk<void, string>(
  'posts/createPost',
  async (postText, { rejectWithValue, dispatch }) => {
    try {
      await createPostService({ postText });
      dispatch(fetchPosts({ type: 'get_news_feed' }));
    } catch (error) {
      return rejectWithValue('Failed to create post');
    }
    return;
  },
);
export const removeSavedPost =
  (post_id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { savedPosts } = getState().posts;
    const updatedSavedPosts = savedPosts.filter(
      (post: Post) => post.id !== post_id,
    );
    dispatch(postsSlice.actions.setSavedPosts(updatedSavedPosts));
  };

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSavedPosts(state, action: PayloadAction<Post[]>) {
      state.savedPosts = action.payload;
    },
    removeSavedPost(state, action: PayloadAction<string>) {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.id !== action.payload,
      );
    },
    resetPagination(state) {
      state.posts = [];
      state.after_post_id = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPosts thunk
      .addCase(fetchPosts.pending, (state) => {
        state.postStatus = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postStatus = 'succeeded';
        state.posts = [...state.posts, ...action.payload.posts];
        state.after_post_id = action.payload.after_post_id;
        state.hasMore = action.payload.posts.length > 0;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      })
      // Handle fetchSavedPosts thunk
      .addCase(fetchSavedPosts.pending, (state) => {
        state.savedPostStatus = 'loading';
      })
      .addCase(
        fetchSavedPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.savedPostStatus = 'succeeded';
          state.savedPosts = action.payload;
        },
      )
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.savedPostStatus = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      })

      // Handle hidePost thunk
      // .addCase(hidePost.pending, (state) => {
      //   state.postStatus = 'loading';
      // })
      // .addCase(hidePost.fulfilled, (state) => {
      //   state.postStatus = 'succeeded';
      // })
      // .addCase(hidePost.rejected, (state, action) => {
      //   state.postStatus = 'failed';
      //   state.error = action.error.message ?? COMMON_ERROR;
      // })

      // Handle fetchPodcasts thunk
      .addCase(fetchPodcasts.pending, (state) => {
        state.podcastsStatus = 'loading';
      })
      .addCase(
        fetchPodcasts.fulfilled,
        (state, action: PayloadAction<Podcast[]>) => {
          state.podcastsStatus = 'succeeded';
          state.podcasts = action.payload;
        },
      )
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.podcastsStatus = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      })

      // Handle HighlightedEpisode thunk
      .addCase(fetchHighlightedEpisode.pending, (state) => {
        state.highEpisodesStatus = 'loading';
      })
      .addCase(
        fetchHighlightedEpisode.fulfilled,
        (
          state,
          action: PayloadAction<{
            episodes: HighlightedEpisode[];
            type: keyof EpisodesCarousel;
          }>,
        ) => {
          state.highEpisodesStatus = 'succeeded';
          const { type, episodes } = action.payload;
          state.highlightedEpisodes[type].episodes = episodes;
        },
      )
      .addCase(fetchHighlightedEpisode.rejected, (state, action) => {
        state.highEpisodesStatus = 'failed';
        state.error = action.payload as string;
      })

      // Handle createPost thunk
      .addCase(createPost.pending, (state) => {
        state.postStatus = 'loading';
      })
      .addCase(createPost.fulfilled, (state) => {
        state.postStatus = 'succeeded';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.error = action.error.message ?? COMMON_ERROR;
      });
  },
});

export const { resetPagination } = postsSlice.actions;
