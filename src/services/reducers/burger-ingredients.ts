import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/ingredientTypes';
import { getIngredients } from '../actions/burger-ingredients';

export interface IIngredientsState {
  isLoading: boolean;
  isError: boolean;
  items: IIngredient[];
}

export const initialState: IIngredientsState = {
  isLoading: false,
  isError: false,
  items: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getIngredients.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getIngredients.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.items = payload.data;
      }
      state.isLoading = false;
    });
    builder.addCase(getIngredients.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const ingredientsReducer = ingredientsSlice.reducer;
