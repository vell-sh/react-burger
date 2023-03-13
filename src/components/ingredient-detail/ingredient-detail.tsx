import cn from 'classnames';
import { IIngredient } from '../../types/ingredientTypes';
import InformationElement from './information-element/information-element';

import styles from './style.module.css';

interface IProps {
  ingredient: IIngredient;
}

const getInformationList = (ingredient: IIngredient) => {
  return [
    { name: 'Калории,ккал', value: ingredient.calories },
    { name: 'Белки, г', value: ingredient.proteins },
    { name: 'Жиры, г', value: ingredient.fat },
    { name: 'Углеводы, г', value: ingredient.carbohydrates },
  ];
};

const IngredientDetails = ({ ingredient }: IProps) => {
  return (
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
  );
};

export default IngredientDetails;
