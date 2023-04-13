import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUser, USER_ACTIONS_TYPE } from '../actions/user';
import { IUser } from '../../types/userTypes';

export interface UserState {
  user: IUser | null;
  isError: boolean;
  isLoading: boolean;
}

const initialState: UserState = { user: null, isError: false, isLoading: false };

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    [USER_ACTIONS_TYPE.SET_USER]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUser.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.user = payload.user;
      }
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const { SET_USER } = userSlice.actions;
export const userReducer = userSlice.reducer;
