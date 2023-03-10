import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React from 'react';
import { IIngredient } from '../../types/ingredientTypes';
import OrderDetails from '../order-details/order-details';
import OrderConfirmation from './order-confirmation/order-confirmation';

import styles from './style.module.css';

type IProps = {
  mainList: Array<IIngredient>;
  className?: string;
  bun?: IIngredient;
};

const BurgerConstructor = ({ className, bun, mainList }: IProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  if (!bun) {
    return <></>;
  }

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
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
        <OrderConfirmation onClick={handleOpenModal} price={1234} />
        {isVisible && <OrderDetails isVisible={isVisible} onClose={handleCloseModal} />}
      </div>
    </section>
  );
};

export default BurgerConstructor;
