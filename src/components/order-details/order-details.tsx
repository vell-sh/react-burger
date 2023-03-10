import cn from 'classnames';
import done from '../../images/graphics.svg';
import Modal from '../modal/modal';

import styles from './style.module.css';

interface IProps {
  onClose(): void;
}

const OrderDetails = ({ onClose }: IProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={cn(styles.container, 'pb-20')}>
        <span className="text text_type_digits-large mb-8">034536</span>
        <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
        <img src={done} alt="Заказ оформлен" className="mb-15" />
        <span className="mb-2 text text_type_main-default">Ваш заказ начали готовить</span>
        <span className="text-secondary">Дождитесь готовности на орбитальной станции</span>
      </div>
    </Modal>
  );
};

export default OrderDetails;
