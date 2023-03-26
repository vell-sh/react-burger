import cn from 'classnames';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { AppDispatch } from '../../store';
import { IIngredient } from '../../types/ingredientTypes';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './style.module.css';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={cn('pt-10 pb-10 container', styles.main)}>
        <h1 className={styles.title}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.content}>
            <BurgerIngredients className={cn('mr-10', styles.grid)} />
            <BurgerConstructor className={styles.grid} />
          </div>
        </DndProvider>
      </main>
    </>
  );
};

export default App;
