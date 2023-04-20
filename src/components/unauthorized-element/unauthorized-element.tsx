import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';

interface IProps {
  element: JSX.Element;
}

const UnauthorizedElement = ({ element }: IProps) => {
  const { user } = useAppSelector(state => state.user);

  if (user?.email) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default UnauthorizedElement;
