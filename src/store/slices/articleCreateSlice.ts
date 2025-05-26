import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type {
  ArticleData,
  ArticleResponse,
  ArticleState,
} from '../../shared/types';
import type { RootState } from '../store';
import { API_KEY, API_URL } from '../../shared/variables';

export const createArticle = createAsyncThunk<
  ArticleResponse,
  ArticleData,
  { rejectValue: string; state: RootState }
>(
  'articleCreate/create',
  async (articleData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.accessToken;

      const response = await axios.post<ArticleResponse>(
        `${API_URL}/articles`,
        articleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-API-KEY': API_KEY,
          },
        },
      );

      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ code?: string; message?: string }>;
      if (error.response?.status === 401) {
        return rejectWithValue('Unauthorized or invalid API key');
      }
      return rejectWithValue('Failed to create article');
    }
  },
);

const initialState: ArticleState = {
  article: null,
  loading: false,
  error: null,
};

const createArticleSlice = createSlice({
  name: 'articleCreate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createArticle.fulfilled,
        (state, action: PayloadAction<ArticleResponse>) => {
          state.loading = false;
          state.article = action.payload;
        },
      )
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export default createArticleSlice.reducer;
