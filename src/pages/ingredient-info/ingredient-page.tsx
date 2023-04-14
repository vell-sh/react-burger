/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-detail/ingredient-detail';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getIngredients } from '../../services/actions/burger-ingredients';
import styles from './styles.module.css';

const IngredientPage = () => {
  const { items: ingredients, isLoading } = useAppSelector(state => state.ingredients);
  const { ingredientId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!ingredients.length) {
      return;
    }
    dispatch(getIngredients());
  }, []);

  if (!ingredients.length || isLoading) {
    return <div>Загрузка</div>;
  }

  if (!ingredients.find(i => i._id === ingredientId)) {
    return <Navigate to={'/not-found'} />;
  }
  return (
    <div className={cn(styles.main, 'pt-30')}>
      <h1 className={cn('text text_type_main-large', styles.title)}>Детали ингредиента</h1>
      <div className={styles.ingredient}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientPage;
