import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React from 'react';
import { getRandomRangeValue } from '../../lib/utils';
import { formatIngridientType } from '../../services/format.service';
import { IIngredient, IngridientType } from '../../types/ingredientTypes';
import IngredientDetails from '../ingredient-detail/ingredient-detail';
import Modal from '../modal/modal';
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
      <div className={styles.menu}>
        <Tab
          value={IngridientType.bun}
          active={current === IngridientType.bun}
          onClick={setCurrent}>
          {formatIngridientType(IngridientType.bun)}
        </Tab>
        <Tab
          value={IngridientType.sauce}
          active={current === IngridientType.sauce}
          onClick={setCurrent}>
          {formatIngridientType(IngridientType.sauce)}
        </Tab>
        <Tab
          value={IngridientType.main}
          active={current === IngridientType.main}
          onClick={setCurrent}>
          {formatIngridientType(IngridientType.main)}
        </Tab>
      </div>
      <div className={cn('custom-scroll', styles.container)}>
        <div>
          <BurgerIngredientsWrapper title={formatIngridientType(IngridientType.bun)}>
            {bunItems.map(x => (
              <BurgerIngredient
                key={x._id}
                item={x}
                count={getRandomRangeValue(0, 5)}
                onClick={handleOpenModal}
              />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title={formatIngridientType(IngridientType.sauce)}>
            {sauceItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={handleOpenModal} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper title={formatIngridientType(IngridientType.main)}>
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
