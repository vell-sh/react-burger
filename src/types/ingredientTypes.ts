export interface IIngredient {
  _id: string;
  name: string;
  type: IngridientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

export enum IngridientType {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}
