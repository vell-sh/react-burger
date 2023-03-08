import { IIngredient } from '../../types/ingredientTypes';
import cn from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import OrderConfirmation from './order-confirmation';

type IProps = {
  className?: string;
  bun?: IIngredient;
  mainList: Array<IIngredient>;
};

const BurgerConstructor = ({ className, bun, mainList }: IProps) => {
  if (!bun) {
    return <></>;
  }
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
            <div className={styles.availableConstructorItem}>
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
        <OrderConfirmation price={1234} />
      </div>
    </section>
  );
};

export default BurgerConstructor;
