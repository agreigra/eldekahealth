
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/productsApi';
import { blogsApi } from '../services/blogsApi';
import { authenticationApi } from '../services/authenticationApi';
import { userApi } from '../services/userApi';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware, 
      blogsApi.middleware,
      authenticationApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
