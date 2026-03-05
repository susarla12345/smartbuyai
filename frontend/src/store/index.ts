import { configureStore } from '@reduxjs/toolkit';
import { searchApi } from './api/searchApi';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    [searchApi.reducerPath]: searchApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
