import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import cn from 'classnames';
import { IIngredient } from '../../../types/ingredientTypes';

type IProps = {
  item: IIngredient;
  count?: number;
  onClick(item: IIngredient): void;
};

const BurgerIngredient = ({ item, count, onClick }: IProps) => {
  const { name, image, price } = item;
  return (
    <div className={cn(styles.wrapper)} onClick={() => onClick(item)}>
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
