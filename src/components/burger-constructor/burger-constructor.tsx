import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React from 'react';
import { IIngredient } from '../../types/ingredientTypes';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import OrderConfirmation from './order-confirmation/order-confirmation';

import styles from './style.module.css';

type IProps = {
  ingredientList: Array<IIngredient>;
  className?: string;
  bun?: IIngredient;
};

const BurgerConstructor = ({ className, bun, ingredientList: mainList }: IProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const EmptyConstructor = () => {
    return (
      <p className=" text text_type_main-default">Корзина пуста, добавьте булку для бургера</p>
    );
  };

  if (!bun || (!bun && mainList.length === 0)) {
    return <EmptyConstructor />;
  }

  const orderPrice = () => {
    if (bun.price) {
      return bun.price * 2 + mainList.reduce((acc, curr) => acc + curr.price, 0);
    } else {
      return mainList.reduce((acc, curr) => acc + curr.price, 0);
    }
  };

  return (
    <section className={cn(className, 'pt-100')}>
      <div className={styles.main}>
        <div className="pl-4 pr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={cn(styles.scrollBlock, 'custom-scroll pl-4 pr-4')}>
          {mainList.map(el => (
            <div key={el._id} className={styles.availableConstructorItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                key={el._id}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
              />
            </div>
          ))}
        </div>
        <div className="pl-4 pr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <OrderConfirmation onClick={handleOpenModal} price={orderPrice()} />
        {isVisible && (
          <Modal onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
