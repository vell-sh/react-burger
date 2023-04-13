import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface IProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({ element }: IProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
