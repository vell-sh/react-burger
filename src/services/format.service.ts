import { IngredientType } from '../types/ingredientTypes';

const INGREDIENT_TYPE_MAP = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

export function formatIngredientType(type: IngredientType) {
  return INGREDIENT_TYPE_MAP[type];
}
