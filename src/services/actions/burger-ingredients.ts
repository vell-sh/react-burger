import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { IIngredient } from '../../types/ingredientTypes';
import { request } from '../../utils/utils';

type ApiAnswer = { success: boolean; data: IIngredient[] };

export const getIngredients = createAsyncThunk<ApiAnswer>('ingridients/get', async () => {
  const res = await request(config.ingredientsUrl, {
    method: 'GET',
  });
  return res;
});
