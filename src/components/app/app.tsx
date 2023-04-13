import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { AppDispatch } from '../../store';
import AppHeader from '../app-header/app-header';

import HomePage from '../../pages/home/home';
import LoginPage from '../../pages/auth/login/login';
import RegisterPage from '../../pages/auth/register/register';
import ForgotPasswordPage from '../../pages/auth/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/auth/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredient-info/ingredient-info';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import OrdersPage from '../../pages/orders/orders';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route path="/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
