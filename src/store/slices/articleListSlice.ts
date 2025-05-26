import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type {
  ArticleProps,
  ArticleListResponse,
  ArticlesState,
} from '../../shared/types';
import type { RootState } from '../store';
import { API_KEY, API_URL } from '../../shared/variables';

export const fetchArticles = createAsyncThunk<
  ArticleProps[],
  void,
  { rejectValue: string; state: RootState }
>('articles/fetchAll', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.accessToken;

    const response = await axios.get<ArticleListResponse>(
      `${API_URL}/articles`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-KEY': API_KEY,
        },
      },
    );

    return response.data.items;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      return rejectWithValue('Unauthorized or invalid API key');
    }
    return rejectWithValue('Failed to fetch articles');
  }
});

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<ArticleProps[]>) => {
          state.loading = false;
          state.articles = action.payload;
        },
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Something went wrong';
      });
  },
});

export default articlesSlice.reducer;
