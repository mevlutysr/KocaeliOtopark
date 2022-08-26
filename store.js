import { configureStore } from '@reduxjs/toolkit';
import SliceReducer from './stores/slice';

export const store = configureStore({
  reducer: {
    Slice: SliceReducer,
  },
})