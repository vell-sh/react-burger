import { createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config/config';
import { IIngredient } from '../../types/ingredientTypes';
import { checkResponse } from '../../utils/utils';

type ApiAnswer = { success: boolean; data: IIngredient[] };

export const getIngredients = createAsyncThunk<ApiAnswer>('ingridients/get', async () => {
  try {
    const res = await fetch(config.ingredientsUrl, {
      method: 'GET',
    });
    const result = await checkResponse(res);
    return result;
  } catch (err: any) {
    return Promise.reject(err);
  }
});
