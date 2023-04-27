/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getUser } from '../../services/actions/auth';

interface IProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({ element }: IProps) => {
  const { user, isLoading, isError } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const init = useCallback(async () => {
    await dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      init();
    }
  }, [init]);

  if (!user?.email || isError) {
    return <Navigate to="/login" replace state={{ redirectUrl: location.pathname }} />;
  }

  return element;
};
