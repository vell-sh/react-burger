import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

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

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
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
        <span className="text-secondary">Вы — новый пользователь?</span>{' '}
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
