import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import createArticleReducer from './createArticleSlice';
import imageReducer from './imageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: createArticleReducer,
    images: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
