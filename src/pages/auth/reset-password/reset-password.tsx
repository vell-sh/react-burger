import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, SyntheticEvent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

type ResetPasswordType = {
  password: string;
  code: string;
};

const initialForm = {
  password: '',
  code: '',
};

const ResetPasswordPage = () => {
  const [form, setForm] = useState<ResetPasswordType>(initialForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Восстановление пароля</h1>
      <form className={cn('mb-6', styles.form)}>
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
          onChange={e => setForm({ ...form, code: e.target.value })}
          value={form.code}
          name="code"
          size="default"
          extraClass="mb-6"
        />
        <Button onClick={onSubmit} htmlType="submit" type="primary" size="medium">
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
