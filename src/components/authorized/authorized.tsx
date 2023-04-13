import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../../pages/home/home';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredient-info/ingredient-info';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import OrdersPage from '../../pages/orders/orders';

const Authorized = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ingredients/:id" element={<IngredientPage />} />
      <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
      <Route path="/orders" element={<ProtectedRouteElement element={<OrdersPage />} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Authorized;
