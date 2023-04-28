import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { SyntheticEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useForm } from '../../../hooks/use-form';
import { loginUser } from '../../../services/actions/auth';
import { SET_USER } from '../../../services/reducers/user';
import { ILoginUser } from '../../../types/authTypes';

import styles from './styles.module.css';

const initialForm = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { values, handleChange } = useForm<ILoginUser>(initialForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = values;
    const res = await dispatch(loginUser({ email, password }));
    if (res) {
      dispatch(SET_USER(res.payload.user));
    }
    const from = location.state?.from;
    from ? navigate(from) : navigate('/');
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Вход</h1>
      <form className={cn('mb-6', styles.form)} onSubmit={onSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          onChange={e => handleChange(e)}
          value={values.email}
          name="email"
          size="default"
          extraClass="mb-6"
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={e => handleChange(e)}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name="password"
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="default"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className="mb-6">
        <span className="text-secondary">Вы — новый пользователь?</span>{' '}
        <Link className="link" to="/register">
          Зарегистрироваться
        </Link>
      </div>
      <div className="mb-6">
        <span className="text-secondary">Забыли пароль?</span>{' '}
        <Link className="link" to="/forgot-password">
          Восстановить пароль
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
