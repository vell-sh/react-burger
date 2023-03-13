import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import styles from './style.module.css';

interface IProps {
  price: number;
  onClick(): void;
}

const OrderConfirmation = ({ price, onClick }: IProps) => {
  return (
    <div className={cn(styles.container, 'pt-6')}>
      <div className={cn('text text_type_main-large', styles.price)}>
        <span>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        onClick={onClick}
        extraClass={styles.button}
        htmlType="button"
        type="primary"
        size="medium">
        Оформить заказ
      </Button>
    </div>
  );
};

const defaultProps = {
  price: 0,
};

OrderConfirmation.defaultProps = defaultProps;

export default OrderConfirmation;
