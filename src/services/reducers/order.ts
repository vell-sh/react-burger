import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../types/orderTypes';
import { createOrder, ORDER_ACTIONS_TYPE } from '../actions/order';

export interface OrderState {
  order: IOrder | null;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: OrderState = {
  order: null,
  isLoading: false,
  isError: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    [ORDER_ACTIONS_TYPE.CLEAR_ORDER]: state => {
      state.order = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(createOrder.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createOrder.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.order = payload.order;
      }
      state.isLoading = false;
    });
    builder.addCase(createOrder.rejected, state => {
      state.order = null;
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { CLEAR_ORDER } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
