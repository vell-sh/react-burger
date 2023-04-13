import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';

interface IProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({ element }: IProps) => {
  const { user } = useAppSelector(state => state.auth);

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
