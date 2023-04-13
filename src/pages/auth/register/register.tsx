import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.css';

type RegisterType = {
  name: string;
  email: string;
  password: string;
};

const initialForm = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterType>(initialForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Регистрация</h1>
      <form className={cn('mb-6', styles.form)}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={e => setForm({ ...form, name: e.target.value })}
          value={form.name}
          name="name"
          errorText="Введите имя"
          size="default"
          extraClass="mb-6"
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={e => setForm({ ...form, email: e.target.value })}
          value={form.email}
          name="email"
          errorText="Введите корректный e-mail"
          size="default"
          extraClass="mb-6"
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={e => setForm({ ...form, password: e.target.value })}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          value={form.password}
          name="password"
          errorText="Пароль не соответствует правилам"
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="default"
          extraClass="mb-6"
        />
        <Button onClick={onSubmit} htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className="mb-6">
        <span className="text-secondary">Уже зарегистрированы?</span>{' '}
        <Link className="link" to="/login">
          Войти
        </Link>
      </div>
    </main>
  );
};

export default RegisterPage;
