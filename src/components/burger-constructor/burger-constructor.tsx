import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ADD_INGREDIENT, SORT_INGREDIENTS } from '../../services/reducers/burger-constructor';
import { RootState } from '../../store';
import { IIngredient } from '../../types/ingredientTypes';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { DraggableItem } from './draggable-item';
import OrderConfirmation from './order-confirmation/order-confirmation';

import styles from './style.module.css';

type IProps = {
  className?: string;
};

const BurgerConstructor = ({ className }: IProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { bun, ingredientList } = useSelector((store: RootState) => store.burgerConstructor);

  const [, dropTargetRef] = useDrop({
    accept: 'add_ingredient',
    drop(item: IIngredient) {
      dispatch(ADD_INGREDIENT(item));
    },
  });

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

  const orderPrice = () => {
    if (bun && bun.price) {
      return bun.price * 2 + ingredientList.reduce((acc, curr) => acc + curr.price, 0);
    } else {
      return ingredientList.reduce((acc, curr) => acc + curr.price, 0);
    }
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(SORT_INGREDIENTS({ from: dragIndex, to: hoverIndex }));
    },
    [dispatch]
  );

  return (
    <section className={cn(className, 'pt-100')} ref={dropTargetRef}>
      {!bun || (!bun && ingredientList.length === 0) ? (
        <EmptyConstructor />
      ) : (
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
            {ingredientList.map((el, index) => (
              <DraggableItem
                moveItem={moveItem}
                key={uuid()}
                id={uuid()}
                index={index}
                text={el.name}
                price={el.price}
                thumbnail={el.image}
              />
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
      )}
    </section>
  );
};

export default BurgerConstructor;
