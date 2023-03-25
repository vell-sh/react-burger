import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';

import { IOrder } from '../../types/orderTypes';

type ApiAnswer = { success: boolean; order: IOrder };

export enum ORDER_ACTIONS_TYPE {
  CLEAR_ORDER = 'CLEAR_ORDER',
}

export const createOrder = createAsyncThunk<ApiAnswer>(
  'order/create',
  async (order, { rejectWithValue }) => {
    try {
      const response = await fetch(config.ingredientsUrl, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data as ApiAnswer;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
