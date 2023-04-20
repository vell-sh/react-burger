import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsInViewport } from '../../hooks/use-in-view-port';
import { formatIngredientType } from '../../services/format.service';
import { ADD_CURRENT_INGREDIENT } from '../../services/reducers/current-ingredient';
import { RootState } from '../../store';
import { IIngredient, IngredientType } from '../../types/ingredientTypes';
import BurgerIngredient from './burger-ingredient/burger-ingredient';
import BurgerIngredientsWrapper from './burger-ingredients-wrapper/burger-ingredients-wrapper';

import styles from './style.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProps {
  className?: string;
}

const BurgerIngredients = ({ className }: IProps) => {
  const [currentTab, setCurrentTab] = useState<IngredientType>(IngredientType.bun);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const ingredients = useSelector((store: RootState) => store.ingredients.items);

  const bunItems = useMemo(
    () => ingredients.filter(x => x.type === IngredientType.bun),
    [ingredients]
  );
  const sauceItems = useMemo(
    () => ingredients.filter(x => x.type === IngredientType.sauce),
    [ingredients]
  );
  const mainItems = useMemo(
    () => ingredients.filter(x => x.type === IngredientType.main),
    [ingredients]
  );

  const showDetails = (ingredient: IIngredient) => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });

    dispatch(ADD_CURRENT_INGREDIENT(ingredient));
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

  const isBunViewport = useIsInViewport(bunRef);
  const isSauceInViewport = useIsInViewport(sauceRef);
  const isMainInViewport = useIsInViewport(mainRef);

  useEffect(() => {
    if (isBunViewport) {
      setCurrentTab(IngredientType.bun);
    } else if (isSauceInViewport) {
      setCurrentTab(IngredientType.sauce);
    } else {
      setCurrentTab(IngredientType.main);
    }
  }, [isBunViewport, isSauceInViewport, isMainInViewport]);

  const onTabClick = (to: IngredientType) => {
    setCurrentTab(to);
    const ref = getRefFromIngredientType(to);
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <section className={className}>
      <div className={styles.menu}>
        <Tab
          value={IngredientType.bun}
          active={currentTab === IngredientType.bun}
          onClick={() => onTabClick(IngredientType.bun)}>
          {formatIngredientType(IngredientType.bun)}
        </Tab>
        <Tab
          value={IngredientType.sauce}
          active={currentTab === IngredientType.sauce}
          onClick={() => onTabClick(IngredientType.sauce)}>
          {formatIngredientType(IngredientType.sauce)}
        </Tab>
        <Tab
          value={IngredientType.main}
          active={currentTab === IngredientType.main}
          onClick={() => onTabClick(IngredientType.main)}>
          {formatIngredientType(IngredientType.main)}
        </Tab>
      </div>
      <div className={cn('custom-scroll', styles.container)} ref={scrollContainerRef}>
        <div>
          <BurgerIngredientsWrapper
            title={formatIngredientType(IngredientType.bun)}
            innerRef={bunRef}>
            {bunItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={showDetails} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper
            title={formatIngredientType(IngredientType.sauce)}
            innerRef={sauceRef}>
            {sauceItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={showDetails} />
            ))}
          </BurgerIngredientsWrapper>
          <BurgerIngredientsWrapper
            title={formatIngredientType(IngredientType.main)}
            innerRef={mainRef}>
            {mainItems.map(x => (
              <BurgerIngredient key={x._id} item={x} onClick={showDetails} />
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
