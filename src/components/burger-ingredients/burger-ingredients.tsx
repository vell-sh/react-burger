import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, { useRef } from 'react';
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
  const [current, setCurrent] = React.useState(IngredientType.bun as string);
  const [currentIngredient, setCurrentIngredient] = React.useState<IIngredient | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const ingredients = useSelector((store: RootState) => store.ingredients.items);

  const bunItems = ingredients.filter(x => x.type === IngredientType.bun);
  const sauceItems = ingredients.filter(x => x.type === IngredientType.sauce);
  const mainItems = ingredients.filter(x => x.type === IngredientType.main);

  const handleOpenModal = (ingredient: IIngredient) => {
    setCurrentIngredient(ingredient);
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const getRefFromIngredientType = (type: IngredientType) => {
    switch (type) {
      case IngredientType.sauce:
        return sauceRef;
      case IngredientType.main:
        return mainRef;
      case IngredientType.bun:
      default:
        return bunRef;
    }
  };

  const onScroll = (to: IngredientType) => {
    setCurrent(to);
    const ref = getRefFromIngredientType(to);
    console.log(to);
    console.log(ref.current);
    console.log(current);
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <section className={className}>
      <div className={styles.menu}>
        <Tab
          value={IngredientType.bun}
          active={current === IngredientType.bun}
          onClick={() => onScroll(IngredientType.bun)}>
          {formatIngredientType(IngredientType.bun)}
        </Tab>
        <Tab
          value={IngredientType.sauce}
          active={current === IngredientType.sauce}
          onClick={() => onScroll(IngredientType.sauce)}>
          {formatIngredientType(IngredientType.sauce)}
        </Tab>
        <Tab
          value={IngredientType.main}
          active={current === IngredientType.main}
          onClick={() => onScroll(IngredientType.main)}>
          {formatIngredientType(IngredientType.main)}
        </Tab>
      </div>
      <div className={cn('custom-scroll', styles.container)} ref={scrollContainerRef}>
        <div>
          <BurgerIngredientsWrapper
            title={formatIngredientType(IngredientType.bun)}
            innerRef={bunRef}>
            {bunItems.map(x => (
              <BurgerIngredient
                key={x._id}
                item={x}
                count={getRandomRangeValue(0, 5)}
                onClick={handleOpenModal}
              />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper
            title={formatIngredientType(IngredientType.sauce)}
            innerRef={sauceRef}>
            {sauceItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={handleOpenModal} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper
            title={formatIngredientType(IngredientType.main)}
            innerRef={mainRef}>
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
