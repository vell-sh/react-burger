import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConstructorIngridient, IBurgerConstructor } from '../../types/burgerConstructorTypes';
import { IIngredient, IngridientType } from '../../types/ingredientTypes';
import { BURGER_CONSTRUCTOR_ACTIONS_TYPE } from '../actions/burger-constructor';
import { v4 as uuid } from 'uuid';

const initialState: IBurgerConstructor = {
  bun: null,
  ingridientList: [],
};

const constructorSlice = createSlice({
  initialState,
  name: 'burgerConstructor',
  reducers: {
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.ADD_INGREDIENT]: (
      state,
      action: PayloadAction<IIngredient>
    ) => {
      if (action.payload.type === IngridientType.bun) {
        state.bun = action.payload;
        return;
      }
      state.ingridientList.push({
        constructorId: uuid(),
        ...action.payload,
      });
    },
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.REMOVE_INGREDIENT]: (
      state,
      action: PayloadAction<ConstructorIngridient>
    ) => {
      if (action.payload.type === IngridientType.bun) {
        if (state.bun === null) {
          return;
        }
        if (action.payload._id === state.bun._id) {
          state.bun = null;
        }
        return;
      }
      state.ingridientList = state.ingridientList.filter(
        item => item.constructorId !== action.payload.constructorId
      );
    },
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.CLEAR_CONSTRUCTOR]: state => {
      state.bun = null;
      state.ingridientList = [];
    },
    [BURGER_CONSTRUCTOR_ACTIONS_TYPE.SORT_INGREDIENTS]: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const [target] = state.ingridientList.splice(action.payload.from, 1);
      state.ingridientList.splice(action.payload.to, 0, target);
    },
  },
});
export const { ADD_INGREDIENT, REMOVE_INGREDIENT, CLEAR_CONSTRUCTOR, SORT_INGREDIENTS } =
  constructorSlice.actions;
export const burgerConstructorReducer = constructorSlice.reducer;
