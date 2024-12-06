import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from './slices/budgedSlice'
import recordReducer from './slices/recordSlice'
const store = configureStore({
  reducer: {
    budget: budgetReducer,
    records: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
