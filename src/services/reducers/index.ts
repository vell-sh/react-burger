import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientsReducer } from './burger-ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
});
