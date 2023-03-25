import { IIngredient } from './ingredientTypes';

export interface IBurgerConstructor {
  bun: IIngredient | null;
  ingridientList: Array<ConstructorIngridient>;
}

export type ConstructorIngridient = IIngredient & {
  constructorId: string;
};
