import { AsyncThunkAction } from '@reduxjs/toolkit';
import cn from 'classnames';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import store, { AppDispatch } from '../../store';
import { IIngredient } from '../../types/ingredientTypes';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './style.module.css';

interface IIngredientsLoad {
  isLoading: boolean;
  hasError: boolean;
  ingredients: Array<IIngredient>;
}

const App = () => {
  const [state, setState] = React.useState<IIngredientsLoad>({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const bun = state.ingredients.find(x => x.type === 'bun');
  const itemWithoutBuns = state.ingredients.filter(x => x.type !== 'bun').slice(7);

  return (
    <>
      <AppHeader />
      <main className={cn('pt-10 pb-10 container', styles.main)}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={styles.content}>
          <BurgerIngredients className={cn('mr-10', styles.grid)} />
          <BurgerConstructor bun={bun} ingredientList={itemWithoutBuns} className={styles.grid} />
        </div>
      </main>
    </>
  );
};

export default App;
