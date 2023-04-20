import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithRefresh, getCookie } from '../../utils/utils';
import config from '../../config/config';

interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
}

export enum USER_ACTIONS_TYPE {
  SET_USER = 'SET_USER',
}

export const updateUser = createAsyncThunk('updateUser/patch', async (updateData: IUpdateUser) => {
  const token = getCookie('accessToken');
  const result = await fetchWithRefresh(config.getUserUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return result;
});
