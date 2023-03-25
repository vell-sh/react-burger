import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
});
