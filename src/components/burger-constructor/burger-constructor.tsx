import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createOrder } from '../../services/actions/order';
import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  SORT_INGREDIENTS,
} from '../../services/reducers/burger-constructor';
import { CLEAR_ORDER } from '../../services/reducers/order';
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
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const { bun, ingredientList } = useSelector((store: RootState) => store.burgerConstructor);
  const order = useSelector((store: RootState) => store.order.order?.number);

  const [, dropTargetRef] = useDrop({
    accept: 'add_ingredient',
    drop(item: IIngredient) {
      dispatch(ADD_INGREDIENT(item));
    },
  });

  const handleOpenModal = () => {
    if (!bun) {
      return; // TODO Сделать модалку с ошибкой
    }
    const postData = ingredientList.map(x => x._id);
    postData.unshift(bun._id);
    postData.push(bun._id);

    // TODO обработать ошибку
    dispatch(createOrder({ ingredients: postData }));
  };

  const handleCloseModal = () => {
    dispatch(CLEAR_CONSTRUCTOR());
    dispatch(CLEAR_ORDER());
  };

  const orderPrice = useMemo(() => {
    if (ingredientList.length === 0) {
      return 0;
    }
    const resultPrice = ingredientList.reduce((acc, item) => (acc += item.price), 0);
    if (bun !== null) {
      return resultPrice + bun.price;
    }
    return resultPrice;
  }, [ingredientList, bun]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    dispatch(SORT_INGREDIENTS({ from: dragIndex, to: hoverIndex }));
  };

  const EmptyConstructor = () => {
    return (
      <p className="p-4 text text_type_main-default">Корзина пуста, добавьте булку для бургера</p>
    );
  };

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
                key={el.constructorId}
                id={el.constructorId}
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
          <OrderConfirmation onClick={handleOpenModal} price={orderPrice} />
          {!!order && (
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
