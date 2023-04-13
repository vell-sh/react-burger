import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.css';
import { forgotPassword } from '../../../services/actions/auth';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';

type ResetPasswordType = {
  email: string;
};

const initialForm = {
  email: '',
};

const ForgotPasswordPage = () => {
  const [form, setForm] = useState<ResetPasswordType>(initialForm);
  const dispatch = useAppDispatch();
  const navidate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email } = form;
    const res = await dispatch(forgotPassword(email));
    if (res) {
      navidate('/reset-password');
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Восстановление пароля</h1>
      <form className={cn('mb-6', styles.form)}>
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Укажите e-mail"
          onChange={e => setForm({ ...form, email: e.target.value })}
          errorText={'Ошибка'}
          size="default"
          extraClass="mb-6"
        />
        <Button onClick={onSubmit} htmlType="submit" type="primary" size="medium">
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
