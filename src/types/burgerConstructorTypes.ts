import { IIngredient } from './ingredientTypes';

export interface IBurgerConstructor {
  bun: IIngredient | null;
  ingredientList: Array<ConstructorIngridient>;
}

export type ConstructorIngridient = IIngredient & {
  constructorId: string;
};
