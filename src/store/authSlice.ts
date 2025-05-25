import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

interface AuthState {
  accessToken: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  username: localStorage.getItem('username'),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { username, password },
        {
          headers: {
            'X-API-KEY': API_KEY,
          },
        },
      );
      return { accessToken: res.data.access_token, username };
    } catch (err: unknown) {
      const error = err as AxiosError<{ code?: string; message?: string }>;
      if (error.response) {
        const status = error.response.status;
        const code = error.response.data?.code;

        if (status === 401) {
          return rejectWithValue('Invalid API key or unauthorized request');
        }
        if (code === 'INVALID_CREDENTIALS') {
          return rejectWithValue('Incorrect username or password');
        }

        return rejectWithValue(
          'Login failed: ' + (error.response.data?.message || 'Unknown error'),
        );
      }

      return rejectWithValue('Network error or no response from server');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.username = null;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('username', action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
