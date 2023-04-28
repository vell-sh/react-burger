import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useForm } from '../../../hooks/use-form';
import { forgotPassword } from '../../../services/actions/auth';
import { IForgotPassword } from '../../../types/authTypes';

import styles from './styles.module.css';

const initialForm = {
  email: '',
};

const ForgotPasswordPage = () => {
  const { values, handleChange } = useForm<IForgotPassword>(initialForm);
  const dispatch = useAppDispatch();
  const navidate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email } = values;
    const res = await dispatch(forgotPassword(email));
    if (res) {
      navidate('/reset-password');
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Восстановление пароля</h1>
      <form className={cn('mb-6', styles.form)} onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          value={values.email}
          placeholder="Укажите e-mail"
          onChange={e => handleChange(e)}
          errorText={'Ошибка'}
          size="default"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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

export default ForgotPasswordPage;
