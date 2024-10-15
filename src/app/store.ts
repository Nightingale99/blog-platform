import { configureStore } from '@reduxjs/toolkit';
import articlesApi from '@/components/shared/articles/articlesAPI';
import userApi from '@/components/shared/user/usersAPI';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(userApi.middleware);
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
