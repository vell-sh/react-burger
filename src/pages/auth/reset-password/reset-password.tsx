import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { useForm } from '../../../hooks/use-form';
import { resetPassword } from '../../../services/actions/auth';
import { IResetPassword } from '../../../types/authTypes';

import styles from './styles.module.css';

const initialForm = {
  password: '',
  token: '',
};

const ResetPasswordPage = () => {
  const { values, handleChange } = useForm<IResetPassword>(initialForm);
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
    await dispatch(resetPassword(values));
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
          onChange={e => handleChange(e)}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name="password"
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="default"
          extraClass="mb-6"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={e => handleChange(e)}
          value={values.token}
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
