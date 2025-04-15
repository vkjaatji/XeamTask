import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import taskSlice from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
