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
  EnrichedArticle,
  ArticleDetailProps,
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

export const fetchEnrichedArticles = createAsyncThunk<
  EnrichedArticle[],
  void,
  { state: RootState; rejectValue: string }
>('articles/fetchEnriched', async (_, { getState, rejectWithValue }) => {
  try {
    const { accessToken } = getState().auth;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'X-API-KEY': API_KEY,
    };

    const res = await axios.get<ArticleListResponse>(`${API_URL}/articles`, {
      headers,
    });
    const basicArticles = res.data.items;

    const enriched = await Promise.all(
      basicArticles.map(async (article) => {
        const detailRes = await axios.get<ArticleDetailProps>(
          `${API_URL}/articles/${article.articleId}`,
          { headers },
        );

        let imageUrl: string | null = null;
        if (article.imageId) {
          const imageRes = await axios.get(
            `${API_URL}/images/${article.imageId}`,
            {
              headers,
              responseType: 'blob',
            },
          );
          imageUrl = URL.createObjectURL(imageRes.data);
        }
        return {
          ...detailRes.data,
          imageUrl,
        };
      }),
    );

    const sortedArticles = [...enriched].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sortedArticles;
  } catch {
    return rejectWithValue('Failed to fetch enriched articles');
  }
});

export const deleteArticle = createAsyncThunk<
  string,
  string,
  { rejectValue: string; state: RootState }
>('articles/delete', async (articleId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.accessToken;
    await axios.delete(`${API_URL}/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-KEY': API_KEY,
      },
    });
    return articleId;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      return rejectWithValue('Unauthorized or invalid API key');
    }
    return rejectWithValue('Failed to delete article');
  }
});

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  enrichedArticles: [] as EnrichedArticle[],
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
      })
      .addCase(fetchEnrichedArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrichedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.enrichedArticles = action.payload;
      })
      .addCase(fetchEnrichedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Enriched fetch failed';
      })
      .addCase(
        deleteArticle.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.enrichedArticles = state.enrichedArticles.filter(
            (a) => a.articleId !== action.payload,
          );
        },
      );
  },
});

export default articlesSlice.reducer;
