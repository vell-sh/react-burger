import React from 'react';
import config from '../../config/config';
import AppHeader from '../app-header';
import BurgerConstructor from '../burger-constructor';
import BurgerIngredients from '../burger-ingredients';
import styles from './style.module.css';
import cn from 'classnames';
import { IIngredient } from '../../types/ingredientTypes';

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

  React.useEffect(() => {
    const getIngredients = () => {
      setState({ ...state, hasError: false, isLoading: true });
      fetch(`${config.ingredientsUrl}`)
        .then(res => res.json())
        .then(result => setState({ ...state, ingredients: result.data, isLoading: false }))
        .catch(() => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };
    getIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bun = state.ingredients.find(x => x.type === 'bun');
  const itemWithoutBuns = state.ingredients.filter(x => x.type !== 'bun').slice(7);

  return (
    <>
      <AppHeader />
      <main className={cn('pt-10 pb-10 container', styles.main)}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <div className={styles.content}>
          <BurgerIngredients className={cn('mr-10', styles.grid)} ingredients={state.ingredients} />
          <BurgerConstructor bun={bun} mainList={itemWithoutBuns} className={styles.grid} />
        </div>
      </main>
    </>
  );
};

export default App;
