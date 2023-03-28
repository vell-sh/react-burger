import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/ingredientTypes';
import { CURRENT_INGREDIENT_ACTIONS_TYPE } from '../actions/current-ingredient';

export interface CurrentIngredientState {
  item: IIngredient | null;
}

const initialState: CurrentIngredientState = { item: null };

const currentIngredientSlice = createSlice({
  initialState,
  name: 'currentIngredient',
  reducers: {
    [CURRENT_INGREDIENT_ACTIONS_TYPE.ADD_CURRENT_INGREDIENT]: (
      state,
      action: PayloadAction<IIngredient>
    ) => {
      state.item = action.payload;
    },
    [CURRENT_INGREDIENT_ACTIONS_TYPE.REMOVE_CURRENT_INGREDIENT]: state => {
      state.item = null;
    },
  },
});
export const { ADD_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT } = currentIngredientSlice.actions;
export const currentIngredientReducer = currentIngredientSlice.reducer;
