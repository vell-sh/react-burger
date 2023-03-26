import cn from 'classnames';
import { useSelector } from 'react-redux';
import done from '../../images/graphics.svg';
import { RootState } from '../../store';

import styles from './style.module.css';

const OrderDetails = () => {
  const number = useSelector((store: RootState) => store.order.order?.number);

  return (
    <div className={cn(styles.container, 'pb-20')}>
      <span className="text text_type_digits-large mb-8">{number}</span>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <img src={done} alt="Заказ оформлен" className="mb-15" />
      <span className="mb-2 text text_type_main-default">Ваш заказ начали готовить</span>
      <span className="text-secondary">Дождитесь готовности на орбитальной станции</span>
    </div>
  );
};

export default OrderDetails;
