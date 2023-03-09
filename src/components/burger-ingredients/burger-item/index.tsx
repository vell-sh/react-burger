import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import cn from 'classnames';
import { IIngredient } from '../../../types/ingredientTypes';

type IProps = {
  item: IIngredient;
  onClick(item: IIngredient): void;
};

const BurgerItem = ({ item, onClick }: IProps) => {
  const { name, image, price } = item;
  return (
    <div className={cn(styles.wrapper)} onClick={() => onClick(item)}>
      <img src={image} alt={name} />
      <p className={styles.price}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default BurgerItem;
