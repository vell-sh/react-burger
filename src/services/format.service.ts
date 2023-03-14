import { IngridientType } from '../types/ingredientTypes';

const INGRIDIENT_TYPE_MAP = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы',
};

export function formatIngridientType(type: IngridientType) {
  return INGRIDIENT_TYPE_MAP[type];
}
