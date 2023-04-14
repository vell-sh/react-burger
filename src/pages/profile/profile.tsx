import cn from 'classnames';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { logoutUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';

import styles from './styles.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshToken = getCookie('refreshToken');
  const { isLoading } = useAppSelector(state => state.user);

  const onLogout = async () => {
    if (refreshToken) {
      await dispatch(logoutUser(refreshToken));
    }
    navigate('/login', { state: { redirectUrl: '/' } });
  };

  const textClassName = 'text text_type_main-medium pt-3 pb-3 pl-5 pr-5 text-non-decoration ';

  return (
    <div className={cn('pt-30 container', styles.main)}>
      <div className={styles.menu}>
        <NavLink
          className={({ isActive }) => cn(textClassName, isActive ? 'text-main' : 'text-secondary')}
          to="/profile"
          end>
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(textClassName, isActive ? 'text-main' : 'text-secondary')}
          to="/profile/orders">
          История заказов
        </NavLink>
        <span onClick={onLogout} className={cn(textClassName, 'text-secondary', styles.linkLogout)}>
          Выход
        </span>
        <p className={cn(styles.info, 'text text_type_main-default mt-20 text-secondary pl-5')}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className="pl-15">
        <Outlet />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default ProfilePage;
