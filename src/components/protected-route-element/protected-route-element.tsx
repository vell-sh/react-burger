/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';

interface IProps {
  element: JSX.Element;
  anonymous?: boolean;
}

export function ProtectedRoute({ element, anonymous }: IProps) {
  const isLoggedIn = useAppSelector(store => store.auth.user?.email);
  const location = useLocation();
  const from = location.state?.from || '/';
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
}
