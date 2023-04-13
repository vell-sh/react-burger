import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_ACTIONS_TYPE } from '../actions/user';
import { IUser } from '../../types/userTypes';

export interface UserState {
  user: IUser | null;
}

const initialState: UserState = { user: null };

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    [USER_ACTIONS_TYPE.SET_USER]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    [USER_ACTIONS_TYPE.UPDATE_USER]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});
export const { SET_USER, UPDATE_USER } = userSlice.actions;
export const userReducer = userSlice.reducer;
