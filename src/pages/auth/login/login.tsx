import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.css';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { loginUser } from '../../../services/actions/auth';
import { SET_USER } from '../../../services/reducers/user';

type LoginType = {
  email: string;
  password: string;
};

const initialForm = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [form, setForm] = useState<LoginType>(initialForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navidate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = form;
    const res = await dispatch(loginUser({ email, password }));
    if (res) {
      dispatch(SET_USER(res.payload.user));
    }
    location.state?.redirectUrl ? navidate(location.state.redirectUrl) : navidate('/');
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Вход</h1>
      <form className={cn('mb-6', styles.form)}>
        <Input
          type="email"
          placeholder="E-mail"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          name="email"
          size="default"
          extraClass="mb-6"
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={e => setForm({ ...form, password: e.target.value })}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          value={form.password}
          name="password"
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="default"
          extraClass="mb-6"
        />
        <Button onClick={onSubmit} htmlType="submit" type="primary" size="medium">
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
