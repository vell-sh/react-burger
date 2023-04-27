/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';

interface IProps {
  element: JSX.Element;
  anonymous?: boolean;
}

// export const ProtectedRouteElement = ({ element }: IProps) => {
//   const { user, isLoading, isError } = useAppSelector(state => state.auth);
//   const dispatch = useAppDispatch();
//   const location = useLocation();

//   const init = useCallback(async () => {
//     await dispatch(getUser());
//   }, []);

//   useEffect(() => {
//     if (!isLoading) {
//       init();
//     }
//   }, [init]);

//   if (!user?.email || isError) {
//     return <Navigate to="/login" replace state={{ redirectUrl: location.pathname }} />;
//   }

//   return element;
// };

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
