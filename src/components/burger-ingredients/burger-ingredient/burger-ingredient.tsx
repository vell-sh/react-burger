import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { IIngredient } from '../../../types/ingredientTypes';

import styles from './style.module.css';

type IProps = {
  item: IIngredient;
  onClick(item: IIngredient): void;
};

const BurgerIngredient = ({ item, onClick }: IProps) => {
  const { name, image, price } = item;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'add_ingredient',
    item,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const opacity = isDrag ? 0.4 : 1;

  const burgerIngredients = useAppSelector(store => store.burgerConstructor.ingredientList);
  const bun = useAppSelector(store => store.burgerConstructor.bun);

  const countIngredients = useMemo(() => {
    if (bun && item._id === bun._id) {
      return 1;
    }
    const burgerItemsById = burgerIngredients.filter(x => x._id === item._id);
    return burgerItemsById.length;
  }, [bun, burgerIngredients, item._id]);

  return (
    <div
      className={cn(styles.wrapper)}
      onClick={() => onClick(item)}
      ref={dragRef}
      style={{ opacity }}>
      {!!countIngredients && <Counter count={countIngredients} size="default" extraClass="m-1" />}
      <img src={image} alt={name} />
      <p className={styles.price}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default BurgerIngredient;
