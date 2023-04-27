import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { useAppSelector } from '../../../hooks/use-app-selector';
import { useForm } from '../../../hooks/use-form';
import { registerUser } from '../../../services/actions/auth';
import { IRegisterUser } from '../../../types/authTypes';

import styles from './styles.module.css';

const initialForm = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { values, handleChange } = useForm<IRegisterUser>(initialForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navidate = useNavigate();
  const { isError } = useAppSelector(state => state.auth);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, email, password } = values;
    console.log(name);
    console.log(email);
    console.log(password);
    const res = await dispatch(registerUser({ name, email, password }));
    if (res && !isError) {
      navidate('/profile');
    }
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={cn('mb-6', styles.header)}>Регистрация</h1>
      <form className={cn('mb-6', styles.form)} onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={e => handleChange(e)}
          value={values.name}
          name="name"
          errorText="Введите имя"
          size="default"
          extraClass="mb-6"
        />
        <Input
          type="email"
          placeholder="E-mail"
          onChange={e => handleChange(e)}
          value={values.email}
          name="email"
          errorText="Введите корректный e-mail"
          size="default"
          extraClass="mb-6"
        />
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={e => handleChange(e)}
          icon={isPasswordVisible ? 'ShowIcon' : 'HideIcon'}
          value={values.password}
          name="password"
          errorText="Пароль не соответствует правилам"
          onIconClick={() => setIsPasswordVisible(!isPasswordVisible)}
          size="default"
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
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
