import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { orderReducer } from './order';
import { currentIngredientReducer } from './current-ingredient';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
});
