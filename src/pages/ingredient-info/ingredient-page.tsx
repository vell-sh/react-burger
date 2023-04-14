/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { Navigate, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-detail/ingredient-detail';
import { useAppSelector } from '../../hooks/use-app-selector';
import styles from './styles.module.css';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';

const IngredientPage = () => {
  const { items: ingredients, isLoading } = useAppSelector(state => state.ingredients);
  const { ingredientId } = useParams();

  const isItemFound = ingredients.find(i => i._id === ingredientId);
  useEffect(() => {
    if (!isItemFound && !isLoading) {
      <Navigate to={'/not-found'} />;
    }
  }, []);

  return (
    <div className={cn(styles.main, 'pt-30')}>
      <h1 className={cn('text text_type_main-large', styles.title)}>Детали ингредиента</h1>
      <div className={styles.ingredient}>
        <IngredientDetails />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default IngredientPage;
