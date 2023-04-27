/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getUser } from '../../services/actions/auth';

interface IProps {
  element: JSX.Element;
}

export const ProtectedRouteElement = ({ element }: IProps) => {
  const { user, isLoading, isError } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    await dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      init();
    }
  }, [init]);

  if (!user?.email || isError) {
    return <Navigate to="/login" replace />;
  }

  return element;
};
