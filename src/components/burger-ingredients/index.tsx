import React from 'react';
import BurgerItem from './burger-item';
import BurgerIngredientsWrapper from './burger-ingredients-wrapper';
import { IIngredient } from '../../types/ingredientTypes';
import cn from 'classnames';
import styles from './style.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
  className?: string;
  ingredients: Array<IIngredient>;
}

const BurgerIngredients = ({ className, ingredients }: IProps) => {
  const [current, setCurrent] = React.useState('bun');
  const bunItems = ingredients.filter(x => x.type === 'bun');
  const sauceItems = ingredients.filter(x => x.type === 'sauce');
  const mainItems = ingredients.filter(x => x.type === 'main');
  return (
    <section className={className}>
      <div className={cn('custom-scroll', styles.container)}>
        <nav style={{ display: 'flex' }}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </nav>
        <div>
          <BurgerIngredientsWrapper title="Булки">
            {bunItems.map(x => (
              <BurgerItem key={x._id} item={x} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title="Соусы">
            {sauceItems.map(x => (
              <BurgerItem key={x._id} item={x} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title="Начинки">
            {mainItems.map(x => (
              <BurgerItem key={x._id} item={x} />
            ))}
          </BurgerIngredientsWrapper>
        </div>
      </div>
    </section>
  );
};

const defaultProps = {
  ingredients: [],
};

BurgerIngredients.defaultProps = defaultProps;

export default BurgerIngredients;
