import { DndProvider } from 'react-dnd';
import cn from 'classnames';

import styles from './style.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const HomePage = () => {
  return (
    <main className={cn('pt-10 pb-10 container', styles.main)}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.content}>
          <BurgerIngredients className={cn('mr-10', styles.grid)} />
          <BurgerConstructor className={styles.grid} />
        </div>
      </DndProvider>
    </main>
  );
};

export default HomePage;
