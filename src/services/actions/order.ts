import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';

import { IOrder } from '../../types/orderTypes';
import { checkResponse, getCookie } from '../../utils/utils';

type ApiAnswer = { success: boolean; order: IOrder; postData: string[] };

export enum ORDER_ACTIONS_TYPE {
  CLEAR_ORDER = 'CLEAR_ORDER',
}

export const createOrder = createAsyncThunk(
  'users/fetchById',
  async (postData: { ingredients: string[] }): Promise<ApiAnswer> => {
    const token = getCookie('accessToken');
    const res = await fetch(config.orderUrl, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await checkResponse(res);
    return result;
  }
);
