import { combineReducers } from 'redux';
import { IBurgerConstructor } from '../../types/burgerConstructorTypes';
import { IIngredient } from '../../types/ingredientTypes';
import { burgerConstructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
});

/*
список всех полученных ингредиентов,
список всех ингредиентов в текущем конструкторе бургера,
объект текущего просматриваемого ингредиента,
объект созданного заказа.
*/
