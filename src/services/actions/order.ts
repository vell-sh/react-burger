import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';

import { IOrder } from '../../types/orderTypes';
import { getCookie, request } from '../../utils/utils';

type ApiAnswer = { success: boolean; order: IOrder; postData: string[] };

export enum ORDER_ACTIONS_TYPE {
  CLEAR_ORDER = 'CLEAR_ORDER',
}

export const createOrder = createAsyncThunk(
  'users/fetchById',
  async (postData: { ingredients: string[] }): Promise<ApiAnswer> => {
    const token = getCookie('accessToken');
    const res = await request(config.orderUrl, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }
);
