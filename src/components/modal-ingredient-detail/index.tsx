import Modal from '../modal';
import styles from './style.module.css';
import cn from 'classnames';
import { IIngredient } from '../../types/ingredientTypes';

interface IProps {
  ingredient: IIngredient;
  isVisible: boolean;
  onClose(): void;
}

const ModalIngredientDetails = ({ ingredient, isVisible, onClose }: IProps) => {
  return (
    <Modal title="Детали ингредиента" isVisible={isVisible} onClose={onClose}>
      <div className={cn(styles.container, 'pb-5')}>
        <div className="mb-4">
          <img src={ingredient.image_large} alt={ingredient.name} />
        </div>
        <span className="text text_type_main-medium mb-8">{ingredient.name}</span>
        <div className={cn(styles.infoContainer, 'text-secondary')}>
          <div className={cn(styles.info, 'mr-5')}>
            <span className="pb-2">Калории,ккал</span>
            <span>{ingredient.calories}</span>
          </div>
          <div className={cn(styles.info, 'mr-5')}>
            <span className="pb-2">Белки, г</span>
            <span>{ingredient.proteins}</span>
          </div>
          <div className={cn(styles.info, 'mr-5')}>
            <span className="pb-2">Жиры, г</span>
            <span>{ingredient.fat}</span>
          </div>
          <div className={styles.info}>
            <span className="pb-2">Углеводы, г</span>
            <span>{ingredient.carbohydrates}</span>
          </div>
        </div>
        {/* <span className="text text_type_digits-large mb-8">034536</span>
        <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
        <img src={done} alt="Заказ оформлен" className="mb-15" />
        <span className="mb-2 text text_type_main-default">Ваш заказ начали готовить</span>
        <span className={styles.textGrey}>Дождитесь готовности на орбитальной станции</span> */}
      </div>
    </Modal>
  );
};

export default ModalIngredientDetails;
