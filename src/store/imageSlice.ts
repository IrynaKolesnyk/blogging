import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import type { RootState } from './store';
import type { ImageData } from '../types';

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export const uploadImages = createAsyncThunk<
  ImageData[],
  FileList,
  { rejectValue: string; state: RootState }
>('images/upload', async (files: FileList, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.auth.accessToken;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('image', file);
    });

    const response = await axios.post(`${API_URL}/images`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-KEY': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ code?: string; message?: string }>;
    if (error.response?.status === 401) {
      return rejectWithValue('Unauthorized or invalid API key');
    }
    return rejectWithValue('Failed to upload images');
  }
});

export const fetchImages = createAsyncThunk<
  ImageData[],
  void,
  { rejectValue: string; state: RootState }
>('images/fetch', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.auth.accessToken;

    const response = await axios.get(`${API_URL}/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-API-KEY': API_KEY,
      },
    });

    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ code?: string; message?: string }>;
    if (error.response?.status === 401) {
      return rejectWithValue('Unauthorized or invalid API key');
    }
    return rejectWithValue('Failed to fetch images');
  }
});

const initialState = {
  images: [] as ImageData[],
  loading: false,
  error: null as string | null,
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = [...state.images, ...action.payload];
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Upload failed';
      })

      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Fetch failed';
      });
  },
});

export default imageSlice.reducer;
