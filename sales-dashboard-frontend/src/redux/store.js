import { configureStore } from '@reduxjs/toolkit';
import summaryReducer from './summarySlice';
import trendsReducer from './trendsSlice';

export const store = configureStore({
  reducer: {
    summary: summaryReducer,
    trends: trendsReducer
  },
});
