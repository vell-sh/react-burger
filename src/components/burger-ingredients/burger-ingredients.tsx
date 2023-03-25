import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRandomRangeValue } from '../../lib/utils';
import { formatIngredientType } from '../../services/format.service';
import { RootState } from '../../store';
import { IIngredient, IngredientType } from '../../types/ingredientTypes';
import IngredientDetails from '../ingredient-detail/ingredient-detail';
import Modal from '../modal/modal';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerIngredientsWrapper from './burger-ingredients-wrapper/burger-ingredients-wrapper';

import styles from './style.module.css';

interface IProps {
  className?: string;
}

const BurgerIngredients = ({ className }: IProps) => {
  const [current, setCurrent] = React.useState('bun');
  const [currentIngredient, setCurrentIngredient] = React.useState<IIngredient | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const ingredients = useSelector((store: RootState) => store.ingredients.items);

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
      <div className={styles.menu}>
        <Tab
          value={IngredientType.bun}
          active={current === IngredientType.bun}
          onClick={setCurrent}>
          {formatIngredientType(IngredientType.bun)}
        </Tab>
        <Tab
          value={IngredientType.sauce}
          active={current === IngredientType.sauce}
          onClick={setCurrent}>
          {formatIngredientType(IngredientType.sauce)}
        </Tab>
        <Tab
          value={IngredientType.main}
          active={current === IngredientType.main}
          onClick={setCurrent}>
          {formatIngredientType(IngredientType.main)}
        </Tab>
      </div>
      <div className={cn('custom-scroll', styles.container)}>
        <div>
          <BurgerIngredientsWrapper title={formatIngredientType(IngredientType.bun)}>
            {bunItems.map(x => (
              <BurgerIngredient
                key={x._id}
                item={x}
                count={getRandomRangeValue(0, 5)}
                onClick={handleOpenModal}
              />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title={formatIngredientType(IngredientType.sauce)}>
            {sauceItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={handleOpenModal} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title={formatIngredientType(IngredientType.main)}>
            {mainItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={handleOpenModal} />
            ))}
          </BurgerIngredientsWrapper>
        </div>
      </div>
      {isVisible && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={currentIngredient!} />
        </Modal>
      )}
    </section>
  );
};

const defaultProps = {
  ingredients: [],
};

BurgerIngredients.defaultProps = defaultProps;

export default BurgerIngredients;
