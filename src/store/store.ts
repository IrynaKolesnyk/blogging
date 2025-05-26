import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import createArticleReducer from './slices/articleCreateSlice';
import imageReducer from './slices/imageSlice';
import articlesReducer from './slices/articleListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articleCreate: createArticleReducer,
    images: imageReducer,
    articleList: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
