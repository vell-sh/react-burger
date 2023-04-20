import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from '../actions/auth';
import { IUser } from '../../types/userTypes';

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  isForgotPassword: boolean;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isError: false,
  isForgotPassword: false,
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
    /* --- forgot password --- */
    builder.addCase(forgotPassword.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.isForgotPassword = true;
      }
      state.isLoading = false;
    });
    builder.addCase(forgotPassword.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
    /* --- reset password --- */
    builder.addCase(resetPassword.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.isForgotPassword = false;
      }
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const authReducer = authSlice.reducer;
