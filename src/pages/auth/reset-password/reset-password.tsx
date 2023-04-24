import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent, useEffect } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.css';
import { resetPassword } from '../../../services/actions/auth';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { IResetPassword } from '../../../types/authTypes';

const initialForm = {
  password: '',
  token: '',
};

const ResetPasswordPage = () => {
  const [form, setForm] = useState<IResetPassword>(initialForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isForgotPassword, isError } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navidate = useNavigate();

  useEffect(() => {
    if (!isForgotPassword) {
      navidate('/login');
    }
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(resetPassword(form));
    if (!isError) {
      navidate('/login');
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Восстановление пароля</h1>
      <form className={cn('mb-6', styles.form)} onSubmit={onSubmit}>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Введите новый пароль"
          onChange={e => setForm({ ...form, password: e.target.value })}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          value={form.password}
          name="password"
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="default"
          extraClass="mb-6"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={e => setForm({ ...form, token: e.target.value })}
          value={form.token}
          name="token"
          size="default"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className="mb-6">
        <span className="text-secondary">Вспомнили пароль?</span>{' '}
        <Link className="link" to="/login">
          Войти
        </Link>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
