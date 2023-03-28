import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerConstructor } from '../../types/burgerConstructorTypes';
import { IIngredient, IngredientType } from '../../types/ingredientTypes';
import { BURGER_CONSTRUCTOR_ACTIONS_TYPE } from '../actions/burger-constructor';
import { v4 as uuid } from 'uuid';

const initialState: IBurgerConstructor = {
  bun: null,
  ingredientList: [],
};

const constructorSlice = createSlice({
  initialState,
  name: 'burgerConstructor',
  reducers: {
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.ADD_INGREDIENT]: (
      state,
      action: PayloadAction<IIngredient>
    ) => {
      if (action.payload.type === IngredientType.bun) {
        state.bun = action.payload;
        return;
      }
      state.ingredientList.push({
        constructorId: uuid(),
        ...action.payload,
      });
    },
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.REMOVE_INGREDIENT]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.ingredientList = state.ingredientList.filter(
        item => item.constructorId !== action.payload
      );
    },
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.CLEAR_CONSTRUCTOR]: state => {
      state.bun = null;
      state.ingredientList = [];
    },
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.SORT_INGREDIENTS]: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const [target] = state.ingredientList.splice(action.payload.from, 1);
      state.ingredientList.splice(action.payload.to, 0, target);
    },
  },
});
export const { ADD_INGREDIENT, REMOVE_INGREDIENT, CLEAR_CONSTRUCTOR, SORT_INGREDIENTS } =
  constructorSlice.actions;
export const burgerConstructorReducer = constructorSlice.reducer;
