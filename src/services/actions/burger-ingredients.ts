import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { IIngredient } from '../../types/ingredientTypes';

type ApiAnswer = { success: boolean; data: IIngredient[] };

export const getIngredients = createAsyncThunk<ApiAnswer>('ingridients/get', async () => {
  const response = await fetch(config.ingredientsUrl, {
    method: 'GET',
  });
  return (await response.json()) as ApiAnswer;
});
