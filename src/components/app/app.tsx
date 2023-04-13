import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { AppDispatch } from '../../store';
import AppHeader from '../app-header/app-header';

import { useAppSelector } from '../../hooks/use-app-selector';
import Auth from '../auth/auth';
import Authorized from '../authorized/authorized';
import { getCookie } from '../../utils/utils';
import { getUser } from '../../services/actions/auth';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = getCookie('accessToken');
  React.useEffect(() => {
    dispatch(getIngredients());
    if (authToken) {
      dispatch(getUser(authToken));
    }
  }, [authToken, dispatch]);

  const { user } = useAppSelector(state => state.auth);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        {!user ? <Auth /> : <Authorized />}
      </BrowserRouter>
    </>
  );
};

export default App;
