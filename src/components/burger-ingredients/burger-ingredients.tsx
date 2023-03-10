import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React from 'react';
import { getRandomRangeValue } from '../../lib/utils';
import { IIngredient } from '../../types/ingredientTypes';
import IngredientDetails from '../ingredient-detail/ingredient-detail';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerIngredientsWrapper from './burger-ingredients-wrapper/burger-ingredients-wrapper';

import styles from './style.module.css';

interface IProps {
  className?: string;
  ingredients: Array<IIngredient>;
}

const BurgerIngredients = ({ className, ingredients }: IProps) => {
  const [current, setCurrent] = React.useState('bun');
  const [currentIngredient, setCurrentIngredient] = React.useState<IIngredient | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const bunItems = ingredients.filter(x => x.type === 'bun');
  const sauceItems = ingredients.filter(x => x.type === 'sauce');
  const mainItems = ingredients.filter(x => x.type === 'main');

  const handleOpenModal = (ingredient: IIngredient) => {
    setCurrentIngredient(ingredient);
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <section className={className}>
      <div className={cn('custom-scroll', styles.container)}>
        <div className={styles.menu}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div>
          <BurgerIngredientsWrapper title="Булки">
            {bunItems.map(x => (
              <BurgerIngredient
                key={x._id}
                item={x}
                count={getRandomRangeValue(0, 5)}
                onClick={handleOpenModal}
              />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title="Соусы">
            {sauceItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={handleOpenModal} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title="Начинки">
            {mainItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={handleOpenModal} />
            ))}
          </BurgerIngredientsWrapper>
        </div>
      </div>
      {isVisible && (
        <IngredientDetails onClose={handleCloseModal} ingredient={currentIngredient!} />
      )}
    </section>
  );
};

const defaultProps = {
  ingredients: [],
};

BurgerIngredients.defaultProps = defaultProps;

export default BurgerIngredients;
