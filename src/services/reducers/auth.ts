import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUser, logoutUser } from '../actions/auth';
import { IUser } from '../../types/userTypes';

export interface IUserState {
  isLoading: boolean;
  isError: boolean;
  user: IUser | null;
}

const initialState: IUserState = {
  isLoading: false,
  user: null,
  isError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    /* --- registerUser --- */
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
      }
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
    /* --- login --- */
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
      }
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
    });
    /* --- getUser --- */
    builder.addCase(getUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
      }
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
    /* --- logout --- */
    builder.addCase(logoutUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = null;
      }
      state.isLoading = false;
    });
    builder.addCase(logoutUser.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const authReducer = authSlice.reducer;
