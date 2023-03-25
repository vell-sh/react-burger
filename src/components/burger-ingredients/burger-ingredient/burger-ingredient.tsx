import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { IIngredient } from '../../../types/ingredientTypes';

import styles from './style.module.css';

type IProps = {
  item: IIngredient;
  count?: number;
  onClick(item: IIngredient): void;
};

const BurgerIngredient = ({ item, count, onClick }: IProps) => {
  const { name, image, price } = item;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'add_ingredient',
    item,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0.4 : 1;

  return (
    <div
      className={cn(styles.wrapper)}
      onClick={() => onClick(item)}
      ref={dragRef}
      style={{ opacity }}>
      {!!count && <Counter count={count} size="default" extraClass="m-1" />}
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
