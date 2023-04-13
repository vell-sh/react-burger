import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './services/reducers';
import type {} from "redux-thunk/extend-redux"

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
