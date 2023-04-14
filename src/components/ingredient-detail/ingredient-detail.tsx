import cn from 'classnames';
import { IIngredient } from '../../types/ingredientTypes';
import InformationElement from './information-element/information-element';

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import styles from './style.module.css';

const getInformationList = (ingredient: IIngredient) => {
  return [
    { name: 'Калории,ккал', value: ingredient.calories },
    { name: 'Белки, г', value: ingredient.proteins },
    { name: 'Жиры, г', value: ingredient.fat },
    { name: 'Углеводы, г', value: ingredient.carbohydrates },
  ];
};

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const ingredients = useAppSelector(state => state.ingredients.items);

  const currentIngredient = useMemo(
    () => ingredients.find(x => x._id === ingredientId),
    [ingredients, ingredientId]
  );

  if (!currentIngredient) {
    return null;
  }

  return (
    <div className={cn(styles.container, 'pb-5')}>
      <div className="mb-4">
        <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      </div>
      <span className="text text_type_main-medium mb-8">{currentIngredient.name}</span>
      <div className={cn(styles.infoContainer, 'text-secondary')}>
        {getInformationList(currentIngredient).map(el => (
          <InformationElement key={el.name} name={el.name} value={el.value} />
        ))}
      </div>
    </div>
  );
};

export default IngredientDetails;
