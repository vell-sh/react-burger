import cn from 'classnames';
import { IIngredient } from '../../types/ingredientTypes';
import Modal from '../modal';
import InformationElement from './information-element';

import styles from './style.module.css';

interface IProps {
  ingredient: IIngredient;
  isVisible: boolean;
  onClose(): void;
}

const getInformationList = (ingredient: IIngredient) => {
  return [
    { name: 'Калории,ккал', value: ingredient.calories },
    { name: 'Белки, г', value: ingredient.proteins },
    { name: 'Жиры, г', value: ingredient.fat },
    { name: 'Углеводы, г', value: ingredient.carbohydrates },
  ];
};

const IngredientDetails = ({ ingredient, isVisible, onClose }: IProps) => {
  return (
    <Modal title="Детали ингредиента" isVisible={isVisible} onClose={onClose}>
      <div className={cn(styles.container, 'pb-5')}>
        <div className="mb-4">
          <img src={ingredient.image_large} alt={ingredient.name} />
        </div>
        <span className="text text_type_main-medium mb-8">{ingredient.name}</span>
        <div className={cn(styles.infoContainer, 'text-secondary')}>
          {getInformationList(ingredient).map(el => (
            <InformationElement key={el.name} name={el.name} value={el.value} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default IngredientDetails;
