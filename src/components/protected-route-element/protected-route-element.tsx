import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getUser } from '../../services/actions/auth';

interface IProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({ element }: IProps) => {
  const { user } = useAppSelector(state => state.auth);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    await dispatch(getUser());
    setIsUserLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
    return null;
  }

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
