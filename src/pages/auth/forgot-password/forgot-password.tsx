import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

type ResetPasswordType = {
  email: string;
};

const initialForm = {
  email: '',
};

const ForgotPasswordPage = () => {
  const [form, setForm] = useState<ResetPasswordType>(initialForm);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Восстановление пароля</h1>
      <form className={cn('mb-6', styles.form)}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          name="email"
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
