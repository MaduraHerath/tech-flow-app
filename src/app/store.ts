import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../feature/auth/authapi';
import authReducer from '../feature/auth/authSlice'
import projectReducer from '../feature/projects/projectSlice'
import { projectApi } from '../feature/projects/projectApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(projectApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;