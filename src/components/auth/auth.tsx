import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/auth/login/login';
import RegisterPage from '../../pages/auth/register/register';
import ForgotPasswordPage from '../../pages/auth/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/auth/reset-password/reset-password';
import HomePage from '../../pages/home/home';

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Auth;
