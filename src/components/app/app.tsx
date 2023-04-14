import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import ForgotPasswordPage from '../../pages/auth/forgot-password/forgot-password';
import LoginPage from '../../pages/auth/login/login';
import RegisterPage from '../../pages/auth/register/register';
import ResetPasswordPage from '../../pages/auth/reset-password/reset-password';
import HomePage from '../../pages/home/home';
import IngredientPage from '../../pages/ingredient-info/ingredient-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OrdersPage from '../../pages/orders/orders';
import ProfilePage from '../../pages/profile/profile';
import { UserForm } from '../../pages/profile/user-form/user-form';
import { getUser } from '../../services/actions/auth';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { SET_USER } from '../../services/reducers/user';
import { AppDispatch } from '../../store';
import { getCookie } from '../../utils/utils';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-detail/ingredient-detail';
import Modal from '../modal/modal';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = getCookie('accessToken');
  useEffect(() => {
    dispatch(getIngredients());
    if (authToken) {
      dispatch(getUser(authToken));
    }
  }, [authToken, dispatch]);

  const { user } = useAppSelector(state => state.auth);

  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (user) {
      dispatch(SET_USER(user));
    }
  }, [dispatch, user]);

  return (
    <>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
          <Route index element={<UserForm />} />
          <Route path="/profile/orders" element={<ProtectedRouteElement element={<div></div>} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {state?.background && (
        <Routes>
          <Route
            path="ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={() => navigate(state.background)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
